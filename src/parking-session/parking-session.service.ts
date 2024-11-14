import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ParkingFloor } from 'src/entities/parking-floor.entity';
import { ParkingOperators } from 'src/entities/parking-operator.entity';
import { ParkingSession } from 'src/entities/parking-session.entity';
import { Vehicle } from 'src/entities/vehicle.entity';
import { Repository } from 'typeorm';
import { createParkingSessionDTO } from './dto/createParkingSession.dto';
import { ParkingBay } from 'src/entities/parking-bay.entity';

@Injectable()
export class ParkingSessionService {
  constructor(
    @InjectRepository(ParkingSession)
    private parkingSessionRepository: Repository<ParkingSession>,
    @InjectRepository(ParkingOperators)
    private parkingOperatorRepository: Repository<ParkingOperators>,
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(ParkingFloor)
    private parkingFloorRepository: Repository<ParkingFloor>,
    @InjectRepository(ParkingBay)
    private parkingBayRepository: Repository<ParkingBay>,
  ) {}

  async checkParams(operatorId, floorId) {
    const parkingOperatorExist = await this.parkingOperatorRepository.findOne({
      where: {
        id: operatorId,
      },
    });

    const parkingFloorExist = await this.parkingFloorRepository.findOne({
      where: {
        id: floorId,
      },
      relations: ['parkingOperator'],
    });

    if (!parkingFloorExist || !parkingOperatorExist) {
      return false;
    }
    if (parkingFloorExist.parkingOperator.id === operatorId) {
      return true;
    }

    // If the operatorId doesn't match, return false
    return false;
  }

  async checkLicensePlate(data) {
    const licensePlate = data['License Plate'];
    const carInRecord = await this.vehicleRepository.findOne({
      where: {
        licensePlate: licensePlate,
      },
    });

    if (!carInRecord) {
      //car not in record,
      const vehicleType = data['Vehicle Type'];
      const vehicleColor = data['Vehicle Color'];
      const vehicleBrand = data['Vehicle Brand'];

      const newVehicle = this.vehicleRepository.create({
        licensePlate: licensePlate,
        vehicleType: vehicleType,
        vehicleBrand: vehicleBrand,
        vehicleColor: vehicleColor,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      try {
        await this.vehicleRepository.save(newVehicle);
      } catch (error) {
        console.error('Error saving vehicle:', error);
        throw new HttpException(
          'Failed to save vehicle',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return;
    }

    //car is in record, logs session as usual

    return true;
  }

  async handleCreateSession(operatorId, floorId, data) {
    //check if valid floor & operator id
    const paramsStatus = await this.checkParams(operatorId, floorId);
    if (!paramsStatus) {
      throw new HttpException('Invalid parameters', HttpStatus.BAD_REQUEST);
    }
    //check if car exist , if not create one

    const payloadTime = data.time;
    const payloadOccupancy = data.occupancy !== 0 ? true : false;
    const payloadSnapshot = data.snapshot;
    const payloadBayId = data.bay_id;
    const licensePlate = data['License Plate'];
    const vehicleType = data['Vehicle Type'];
    const vehicleColor = data['Vehicle Color'];
    const vehicleBrand = data['Vehicle Brand'];

    const licensePlateHandler = await this.checkLicensePlate(data);

    //  Bay existance checking
    const parkingBay = await this.parkingBayRepository.findOne({
      where: { id: payloadBayId },
    });
    if (!parkingBay) {
      throw new NotFoundException(
        `Parking Bay with ID ${payloadBayId} not found`,
      );
    }
    //update bay from OCCUPIED to VACANT vice versa
    await this.parkingBayRepository.update(
      { id: payloadBayId },
      { occupied: payloadOccupancy },
    ); // find id in parkingBay Table that equals to payloadBayId, then update the occupied value with payloadOccupancy

    //get Vehicle entity
    const vehicle = await this.vehicleRepository.findOne({
      where: { licensePlate: data['License Plate'] },
    });
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found after creation');
    }

    const newSession = this.parkingSessionRepository.create({
      eventTime: payloadTime,
      occupied: payloadOccupancy,
      createdAt: new Date(),
      updatedAt: new Date(),
      imagePath: payloadSnapshot, //TODO: do filepath , currently raw base64
      vehicle: vehicle,
      bay: parkingBay,
      duration: 200,
    });

    // Continue with your logic if everything is fine

    await this.parkingSessionRepository.save(newSession);

    return {
      message: 'Parking session created successfully',
      session: newSession,
    };
  }
}

// CRUD into Vehicle, Parking Session
//update Parking Bay status
//return status ok
