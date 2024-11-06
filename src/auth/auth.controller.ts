import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { RegisterPayloadDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { Response as ExpressResponse } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  async registerUser(
    @Res() res: ExpressResponse,
    @Body() registerPayload: RegisterPayloadDto,
  ) {
    await this.authService.createUser(res, registerPayload);
    res.status(HttpStatus.OK).send();
  }

  @Post('login')
  async signInUser(@Req() req, @Res() res: ExpressResponse) {
    const { encodedUser } = await this.authService.signIn(req.body, res);
    res.status(HttpStatus.OK).send({ encodedUser });
  }
}
