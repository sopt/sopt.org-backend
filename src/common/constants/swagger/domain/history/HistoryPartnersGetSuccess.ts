import { ApiExtraModels, ApiProperty, PickType } from '@nestjs/swagger';
import { HistoryPartnersGetResDTO } from 'src/modules/history/dto/history-partners-get.res.dto';
import { OK_TYPE } from '../../..';

@ApiExtraModels()
export class HistoryPartnersGetSuccess extends PickType(OK_TYPE, ['status'] as const) {
  @ApiProperty({
    type: 'string',
    example: '협력사 조회 성공',
  })
  message: string;

  @ApiProperty({
    type: HistoryPartnersGetResDTO,
  })
  data: HistoryPartnersGetResDTO;
}
