import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { sc } from '..';

@ApiExtraModels()
export default class CreatedSuccess {
  @ApiProperty({
    type: 'number',
    description: 'HTTP 상태 코드',
    example: sc.CREATED,
  })
  status: number;

  @ApiProperty({
    type: 'string',
    title: '응답 메시지',
    example: '',
    description: '',
  })
  message: string;

  @ApiProperty({
    type: 'string',
    description: '응답 데이터',
    example: '',
  })
  data: string;
}
