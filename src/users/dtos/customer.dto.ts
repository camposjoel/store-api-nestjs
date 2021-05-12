import { PartialType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  @IsNumberString()
  phone: string;

  @IsArray()
  @IsNotEmpty()
  readonly skills: any;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
