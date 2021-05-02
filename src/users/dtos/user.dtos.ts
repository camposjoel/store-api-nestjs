import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(5)
  password: string;

  @IsNotEmpty()
  role: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
