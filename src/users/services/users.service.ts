import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dtos';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  private counterId = 1;

  private users: User[] = [
    {
      id: 0,
      email: 'joel@test.com',
      password: '123456',
      role: 'admin',
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not exists`);
    }
    return user;
  }

  create(payload: CreateUserDto) {
    const newUser = {
      id: this.counterId,
      ...payload,
    };
    this.counterId += 1;
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, payload: UpdateUserDto) {
    const user = this.findOne(id);
    if (user) {
      const index = this.users.findIndex((u) => u.id === id);
      this.users[index] = {
        ...user,
        ...payload,
      };
      return this.users[index];
    }
    return null;
  }

  delete(id: number) {
    const user = this.findOne(id);
    if (user) {
      const index = this.users.findIndex((u) => u.id === id);
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}
