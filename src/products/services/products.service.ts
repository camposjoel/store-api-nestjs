import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 100;

  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'This product is very nice',
      price: 500,
      stock: 10,
      image: '',
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'This product is good',
      price: 450,
      stock: 5,
      image: '',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((prod) => prod.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not exists`);
      // throw 'No existe el producto';
    }
    return product;
  }

  create(payload: CreateProductDto) {
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.counterId += 1;
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateProductDto) {
    const product = this.findOne(id);
    if (product) {
      const index = this.products.findIndex((prod) => prod.id === id);
      this.products[index] = {
        ...product,
        ...payload,
      };
      return this.products[index];
    }
    return null;
  }

  delete(id: number) {
    const product = this.findOne(id);
    if (product) {
      const index = this.products.findIndex((prod) => prod.id === id);
      this.products.splice(index, 1);
      return true;
    }
    return false;
  }
}
