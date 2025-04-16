import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { NotFoundError } from 'rxjs';

@Controller('cars')
export class CarsController {
  private cars = [
    {
      id: 0,
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: 1,
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: 2,
      brand: 'Ford',
      model: 'Mustang',
    },
  ];

  @Get()
  getAllCars() {
    return this.cars;
  }

  @Get(':id')
  getCarById(@Param('id') id) {
    // return { id };
    const car = this.cars.find((car) => car.id === +id);
    if (!car) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }
    return car;
  }
}
