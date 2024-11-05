import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingBayModule } from './parking-bay/parking-bay.module';
import { ParkingBay } from './entities/parking-bay.entity';
import { ParkingOperators } from './entities/parking-operator.entity';
import { ParkingFloor } from './entities/parking-floor.entity';
import { SeederService } from './seeder/seeder.service';
import { ParkingOperatorModule } from './parking-operator/parking-operator.module';
import { ParkingFloorModule } from './parking-floor/parking-floor.module';
import { SeederModule } from './seeder/seeder.module.';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { ParkingSession } from './entities/parking-session.entity';
import { Vehicle } from './entities/vehicle.entity';
import { Device } from './entities/device.entity';
import { DeviceModule } from './device/device.module';
import { ParkingSessionModule } from './parking-session/parking-session.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { AuthModule } from './auth/auth.module';
import { User } from './entities/user.entity';
import { UserAuth } from './entities/user-auth.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        ParkingBay,
        ParkingOperators,
        ParkingFloor,
        ParkingSession,
        Vehicle,
        Device,
        User,
        UserAuth,
      ],
      synchronize: true,
    }),
    ParkingBayModule,
    ParkingOperatorModule,
    SeederModule,
    ParkingFloorModule,
    DeviceModule,
    ParkingSessionModule,
    VehicleModule,
    AuthModule,
    UserModule,
  ],
  exports: [SeederService],
  controllers: [],
  providers: [SeederService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('song');
    //   consumer
    //     .apply(LoggerMiddleware)
    //     .forRoutes({ path: 'song', method: RequestMethod.POST });
    //
    // consumer.apply(LoggerMiddleware).forRoutes(SongController);
  }
}
