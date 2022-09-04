import { ApiExtraModels, ApiProperty, PickType } from '@nestjs/swagger';
import { SemesterGetResDTO } from 'src/modules/history/dto/semester-get.res.dto';
import { OK_TYPE } from '../../..';

@ApiExtraModels()
export class HistorySeasonsGetSuccess extends PickType(OK_TYPE, ['status'] as const) {
  @ApiProperty({
    type: 'string',
    example: '역대 기수 전체 조회 성공',
  })
  message: string;

  @ApiProperty({
    type: SemesterGetResDTO,
  })
  data: SemesterGetResDTO;
}
