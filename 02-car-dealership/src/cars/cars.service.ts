import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { UpdateCarDto, CreateCarDto } from './dto';
import { instanceToPlain, plainToInstance } from 'class-transformer';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'Toyota',
    //   model: 'Corolla',
    // },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id '${id}' not found`);
    return car;
  }

  create(createCarDto: CreateCarDto) {
    const newCar: Car = {
      id: uuid(),
      ...createCarDto,
    };
    this.cars.push(newCar);
    return newCar;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    let carDB = this.findOneById(id);

    if (updateCarDto.id && updateCarDto.id !== id)
      throw new BadRequestException(`Car id '${updateCarDto.id}' is not valid`);

    // remove undefined properties
    // with class-transformer
    const dtoInstance = plainToInstance(UpdateCarDto, updateCarDto);
    const cleanedDto = instanceToPlain(dtoInstance, {
      exposeUnsetFields: false,
    });

    // with Object.entries
    //  updateCarDto = Object.fromEntries(
    //    Object.entries(updateCarDto).filter(([_, v]) => v !== undefined),
    //  );

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = { ...carDB, ...cleanedDto, id };
        return carDB;
      }
      return car;
    });

    return carDB;
  }

  delete(id: string) {
    const car = this.findOneById(id);
    this.cars = this.cars.filter((c) => c.id !== id);
    return {
      statusCode: 200,
      message: `Car with id: '${id}' was deleted succesfully`,
    };
  }

  fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
