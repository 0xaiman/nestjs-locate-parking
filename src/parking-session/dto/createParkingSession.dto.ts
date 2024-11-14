import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsDateString,
} from 'class-validator';

export class createParkingSessionDTO {
  @IsString()
  event: string;

  @IsString()
  device: string;

  @IsDateString()
  time: string;

  @IsString()
  report_type: string;

  @IsNumber()
  resolution_w: number;

  @IsNumber()
  resolution_h: number;

  @IsNumber()
  channel: number;

  @IsString()
  bay_name: string;

  @IsNumber()
  bay_id: number;

  @IsBoolean()
  occupancy: boolean;

  @IsNumber()
  duration: number;

  @IsString()
  'License Plate': string;

  @IsString()
  'Plate Color': string;

  @IsString()
  'Vehicle Type': string;

  @IsString()
  'Vehicle Color': string;

  @IsString()
  'Vehicle Brand': string;

  @IsNumber()
  coordinate_x1: number;

  @IsNumber()
  coordinate_y1: number;

  @IsNumber()
  coordinate_x2: number;

  @IsNumber()
  coordinate_y2: number;

  @IsString()
  snapshot: string;
}
