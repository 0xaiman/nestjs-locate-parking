import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { StaticTokenAuthGuard } from './guards/static-token-auth/static-token-auth.guard';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Parking System API') // Customize the title
    .setDescription('API documentation for the Parking System') // Customize description
    .setVersion('1.0') // API version
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document); // The route where Swagger UI will be available

  app.enableCors({
    origin: [
      'http://localhost:4200', // Angular Server
    ],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalGuards(new ThrottlerGuard());
  // app.useGlobalGuards(new StaticTokenAuthGuard(app.get(ConfigService)));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
