import { Injectable, NotFoundException } from '@nestjs/common';
import { RegisterPayloadDto } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UserAuth } from 'src/entities/user-auth.entity';
import * as CryptoJS from 'crypto-js';
import { JwtService } from '@nestjs/jwt';
import { CookieOptions, Response } from 'express';
import {
  COOKIE_NAMES,
  expiresInHalfDay,
  expiresInOneDay,
} from './constants/auth.constants';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserAuth)
    private userAuthRepository: Repository<UserAuth>,
  ) {}
  async createUser(res: Response, registerPayload: RegisterPayloadDto) {
    const emailExist = await this.userRepository.findOne({
      where: {
        email: registerPayload.email,
      },
    });

    const usernameExist = await this.userRepository.findOne({
      where: {
        username: registerPayload.username,
      },
    });
    //check email and username if already in use
    if (emailExist) throw new NotFoundException('Email is already taken');
    if (usernameExist) throw new NotFoundException('Username is already taken');

    // password encryption
    const encryptedPassword = await this.userAuthRepository.create({
      password: CryptoJS.AES.encrypt(
        registerPayload.password,
        process.env.JWT_SECRET,
      ).toString(),
    });

    const newUserPassword = this.userAuthRepository.create(encryptedPassword);
    await this.userAuthRepository.save(newUserPassword);

    const newUser = this.userRepository.create({
      ...registerPayload,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
      password: newUserPassword,
    });

    await this.userRepository.save(newUser);

    const encodedUser = this.encodeUserDataAsJwt(newUser);

    this.setJwtTokenToCookies(res, newUser, expiresInOneDay);

    return { encodedUser };
  }

  private encodeUserDataAsJwt(user: any) {
    const { password, ...userData } = user;
    return this.jwtService.sign(userData, {
      expiresIn: 72000,
    });
  }

  setJwtTokenToCookies(res: Response, user: any, expiry: number) {
    const expirationDateInMilliseconds = new Date().getTime() + expiry;
    const cookieOptions: CookieOptions = {
      httpOnly: true, // this ensures that the cookie cannot be accessed through JavaScript!
      expires: new Date(expirationDateInMilliseconds),
    };

    res.cookie(
      COOKIE_NAMES.JWT,
      this.jwtService.sign({
        id: user.id,
        sub: {
          email: user.email,
        },
      }),
      cookieOptions,
    );
  }
}
