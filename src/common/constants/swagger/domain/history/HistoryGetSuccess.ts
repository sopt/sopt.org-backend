import { ApiExtraModels, ApiProperty, PickType } from '@nestjs/swagger';
import { HistoryGetResDTO } from 'src/modules/history/dto/history-get.res.dto';
import { OK_TYPE } from '../../..';

@ApiExtraModels()
export class HistoryGetSuccess extends PickType(OK_TYPE, ['status'] as const) {
  @ApiProperty({
    type: 'string',
    example: '기수별 연혁 조회 성공',
  })
  message: string;

  @ApiProperty({
    type: HistoryGetResDTO,
  })
  data: HistoryGetResDTO;
}
