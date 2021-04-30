import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  phone: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
