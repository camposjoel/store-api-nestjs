import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto, UpdateBrandDto } from 'src/dtos/brand.dtos';
import { Brand } from 'src/entities/brand.entity';

@Injectable()
export class BrandsService {
  private counterId = 1;

  private brands: Brand[] = [
    {
      id: 0,
      name: 'Intel',
      image: ''
    },
  ];

  findAll() {
    return this.brands;
  }

  findOne(id: number) {
    const brand = this.brands.find((item) => item.id === id);
    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not exists`);
    }
    return brand;
  }

  create(payload: CreateBrandDto) {
    const newBrand = {
      id: this.counterId,
      ...payload,
    };
    this.counterId += 1;
    this.brands.push(newBrand);
    return newBrand;
  }

  update(id: number, payload: UpdateBrandDto) {
    const brand = this.findOne(id);
    if (brand) {
      const index = this.brands.findIndex((item) => item.id === id);
      this.brands[index] = {
        ...brand,
        ...payload,
      };
      return this.brands[index];
    }
    return null;
  }

  delete(id: number) {
    const brand = this.findOne(id);
    if (brand) {
      const index = this.brands.findIndex((item) => item.id === id);
      this.brands.splice(index, 1);
      return true;
    }
    return false;
  }
}
