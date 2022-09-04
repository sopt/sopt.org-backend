import { Controller, Get } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { rm } from 'src/common/constants';
import { ResponseEntity } from 'src/common/constants/responseEntity';
import { LogoGetSuccess } from 'src/common/constants/swagger/domain/logo/LogoGetSuccess';
import { InternalServerError } from 'src/common/constants/swagger/error/InternalServerError';
import { LogoService } from './logo.service';

@ApiTags('Logo')
@Controller('logo')
export class LogoController {
  constructor(private readonly logoService: LogoService) {}

  @Get()
  @ApiOperation({
    summary: '프로젝트 로고 조회',
    description: `
    최근 두 기수의 프로젝트 로고를 조회합니다. \n
    최소 60개를 넘지 않는 경우, 이전 기수의 프로젝트 로고를 랜덤으로 조회합니다. \n
    `,
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
    const data = await this.logoService.getLogos();
    return ResponseEntity.OK_WITH_DATA(rm.READ_LOGO_SUCCESS, data);
  }
}
