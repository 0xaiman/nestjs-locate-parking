import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongModule } from './song/song.module';
import { SongController } from './song/song.controller';
import { ParkingBayModule } from './parking-bay/parking-bay.module';
import { ParkingBay } from './entities/parking-bay.entity';
import { ParkingOperators } from './entities/parking-operator.entity';
import { ParkingFloor } from './entities/parking-floor.entity';
import { SeederService } from './seeder/seeder.service';
import { ParkingOperatorModule } from './parking-operator/parking-operator.module';
import { ParkingFloorModule } from './parking-floor/parking-floor.module';
import { SeederModule } from './seeder/seeder.module.';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3356,
      username: 'root',
      password: 'password',
      database: 'lpdb_typeorm',
      entities: [ParkingBay, ParkingOperators, ParkingFloor],
      synchronize: true,
    }),
    SongModule,
    ParkingBayModule,
    ParkingOperatorModule,
    SeederModule,
    ParkingFloorModule,
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

    consumer.apply(LoggerMiddleware).forRoutes(SongController);
  }
}
