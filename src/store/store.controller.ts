import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { StoreService } from './store.service';
// import { StaticTokenAuthGuard } from 'src/guards/static-token-auth/static-token-auth.guard';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Store')
// @UseGuards(StaticTokenAuthGuard)
@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}
  @Get('/nearestStore/storeId/:storeId')
  @ApiOperation({
    summary: 'Fetch nearest store parking data based on store ID',
    description:
      'This endpoint retrieves parking data for the store based on the provided store ID.',
  })
  @ApiParam({
    name: 'storeId',
    description: 'The ID of the store to fetch the parking data for',
    required: true,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved parking data for the store',
    schema: {
      example: {
        storeId: 1,
        nearestStore: 'Store A',
        parkingData: {
          bays: [
            { bayId: 1, status: 'available' },
            { bayId: 2, status: 'occupied' },
          ],
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid store ID provided',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized access - Invalid or missing API key',
  })
  @ApiResponse({
    status: 404,
    description: 'Store not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  nearestStore(@Param('storeId') storeId: number) {
    if (isNaN(Number(storeId))) {
      throw new BadRequestException('Store ID must be a valid integer.');
    }

    // Call service method to retrieve parking data
    return this.storeService.getParkingData(Number(storeId));
  }
}
