import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from 'src/entities/device.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Device])],
  exports: [TypeOrmModule],
})
export class DeviceModule {}
