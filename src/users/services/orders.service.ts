import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateOrderDto,
  UpdateOrderDto,
} from '../dtos/order.dto';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  findAll() {
    return this.orderModel
      .find()
      .populate('customer')
      .populate('products')
      .exec();
  }

  findOne(id: string) {
    return this.orderModel.findById(id).exec();
  }

  create(data: CreateOrderDto) {
    const newOrder = new this.orderModel(data);
    return newOrder.save();
  }

  update(id: string, changes: UpdateOrderDto) {
    return this.orderModel
      .findByIdAndUpdate(
        id,
        {
          $set: changes,
        },
        { new: true },
      )
      .exec();
  }

  delete(id: string) {
    return this.orderModel.findByIdAndDelete(id);
  }

  async removeProduct(idOrder: string, idProduct: string) {
    const order = await this.orderModel.findById(idOrder);
    order.products.pull(idProduct);
    return order.save();
  }

  async addProduct(idOrder: string, productsId: string[]) {
    const order = await this.orderModel.findById(idOrder);
    productsId.forEach((item) => order.products.push(item));
    return order.save();
  }
}
