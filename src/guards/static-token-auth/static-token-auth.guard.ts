import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class StaticTokenAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    const staticToken = this.configService.get<string>('STATIC_AUTH_TOKEN');

    if (authHeader !== `Bearer ${staticToken}`) {
      throw new UnauthorizedException('Invalid Token');
    }

    return true;
  }
}
