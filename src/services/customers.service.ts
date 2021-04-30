import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/dtos/customer.dtos';
import { Customer } from 'src/entities/cutomer.entity';

@Injectable()
export class CustomersService {
  private counterId = 1;

  private customers: Customer[] = [
    {
      id: 0,
      name: 'Joel',
      lastname: 'Campos',
      phone: '1234567890'
    },
  ];

  findAll() {
    return this.customers;
  }

  findOne(id: number) {
    const customer = this.customers.find((item) => item.id === id);
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not exists`);
    }
    return customer;
  }

  create(payload: CreateCustomerDto) {
    const newCustomer = {
      id: this.counterId,
      ...payload,
    };
    this.counterId += 1;
    this.customers.push(newCustomer);
    return newCustomer;
  }

  update(id: number, payload: UpdateCustomerDto) {
    const customer = this.findOne(id);
    if (customer) {
      const index = this.customers.findIndex((item) => item.id === id);
      this.customers[index] = {
        ...customer,
        ...payload,
      };
      return this.customers[index];
    }
    return null;
  }

  delete(id: number) {
    const customer = this.findOne(id);
    if (customer) {
      const index = this.customers.findIndex((item) => item.id === id);
      this.customers.splice(index, 1);
      return true;
    }
    return false;
  }
}
