import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { StaticTokenAuthGuard } from './guards/static-token-auth/static-token-auth.guard';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:4200', // Angular Server
    ],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalGuards(new ThrottlerGuard());
  app.useGlobalGuards(new StaticTokenAuthGuard(app.get(ConfigService)));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
