import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class SemesterGetQueryDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  page: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  limit: number;
}
