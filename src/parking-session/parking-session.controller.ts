import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { ParkingSessionService } from './parking-session.service';
import { createParkingSessionDTO } from './dto/createParkingSession.dto';

@Controller('parking-session')
export class ParkingSessionController {
  constructor(private parkingSessionService: ParkingSessionService) {}

  @Post('test')
  test(@Body() data: any) {
    console.log('hello', data);
    return data;
  }

  @Post('operatorId/:operatorId/floorId/:floorId')
  async createParkingSession(
    @Body() data: any,
    @Param('operatorId') operatorId: string,
    @Param('floorId') floorId: string,
  ) {
    const parseOperatorId = parseInt(operatorId);
    const parsefloorId = parseInt(floorId);

    const sessionStatus = await this.parkingSessionService.handleCreateSession(
      parseOperatorId,
      parsefloorId,
      data,
    );
    return { sessionStatus, operatorId, floorId, data };
  }
}
