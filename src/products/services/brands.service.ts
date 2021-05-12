import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  findAll() {
    return this.brandModel.find().exec();
  }

  async findOne(id: string) {
    const brand = this.brandModel.findById(id);
    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not exists`);
    }
    return brand;
  }

  create(data: CreateBrandDto) {
    const newBrand = new this.brandModel(data);
    return newBrand.save();
  }

  update(id: string, data: UpdateBrandDto) {
    const brand = this.brandModel
      .findByIdAndUpdate(
        id,
        {
          $set: data,
        },
        { new: true },
      )
      .exec();
    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not exists`);
    }
    return brand;
  }

  delete(id: string) {
    return this.brandModel.findByIdAndDelete(id);
  }
}
