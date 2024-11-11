import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { StoreService } from './store.service';
import { StaticTokenAuthGuard } from 'src/guards/static-token-auth/static-token-auth.guard';

@UseGuards(StaticTokenAuthGuard)
@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}
  @Get('/nearestStore/storeId/:storeId')
  nearestStore(@Param('storeId') storeId: number) {
    return this.storeService.getParkingData(storeId);
  }
}
