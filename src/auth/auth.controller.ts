import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { RegisterPayloadDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { Response as ExpressResponse } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  async register(
    @Res() res: ExpressResponse,
    @Body() registerPayload: RegisterPayloadDto,
  ) {
    await this.authService.createUser(res, registerPayload);
    res.status(HttpStatus.OK).send();
  }
}
