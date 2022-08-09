import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { SemesterExist } from 'src/common/decorators/semester-exist.decorator';

export class SemesterTargetDTO {
  @ApiProperty({
    description: '기수를 입력합니다.',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @SemesterExist()
  semesterId: number;
}
