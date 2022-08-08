import { Controller, Get } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LogoGetSuccess } from 'src/common/constants/swagger/domain/logos/LogosGetSuccess';
import { InternalServerError } from 'src/common/constants/swagger/error/InternalServerError';
import { LogosService } from './logos.service';

@ApiTags('Logo')
@Controller('logos')
export class LogosController {
  constructor(private readonly logosService: LogosService) {}

  @Get()
  @ApiOperation({
    summary: '프로젝트 로고 조회',
  })
  @ApiOkResponse({
    description: '프로젝트 로고 조회 성공',
    type: LogoGetSuccess,
  })
  @ApiInternalServerErrorResponse({
    description: '서버 내부 오류입니다.',
    type: InternalServerError,
  })
  async getLogos() {
    //TODO
  }
}
