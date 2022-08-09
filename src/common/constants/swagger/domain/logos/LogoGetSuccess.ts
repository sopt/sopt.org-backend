import { ApiExtraModels, ApiProperty, PickType } from '@nestjs/swagger';
import { LogosGetResDTO } from 'src/modules/logos/dto/logos-get.res.dto';
import { OK_TYPE } from '../../..';

@ApiExtraModels()
export class LogoGetSuccess extends PickType(OK_TYPE, ['status'] as const) {
  @ApiProperty({
    type: 'string',
    example: '프로젝트 로고 조회 성공',
  })
  message: string;

  @ApiProperty({
    type: LogosGetResDTO,
    isArray: true,
  })
  data: LogosGetResDTO[];
}
