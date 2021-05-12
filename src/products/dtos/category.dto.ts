import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  /*@IsUrl()
  @IsNotEmpty()
  readonly image: string;*/
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
