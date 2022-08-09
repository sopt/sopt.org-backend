import { Controller, Get, Param } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { rm } from 'src/common/constants';
import { ResponseEntity } from 'src/common/constants/responseEntity';
import { HistoryGetSuccess } from 'src/common/constants/swagger/domain/history/HistoryGetSuccess';
import { InternalServerError } from 'src/common/constants/swagger/error/InternalServerError';
import { SemesterTargetDTO } from './dto/semester-target.dto';
import { HistoryService } from './history.service';

@ApiTags('History')
@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get(':semesterId')
  @ApiOperation({
    summary: '기수별 연혁 조회',
    description: `
    기수별 회원 구성 중 파트별 인원이 없는 경우, 총 인원 수만 조회합니다. \n
    [파트]의 id값입니다. (1-5 까지는 회장단입니다.) \n
    1: 회장 \n
    2: 부회장 \n
    3: 총무 \n
    4: 운영팀장 \n
    5: 미디어팀장 \n
    6: 기획파트장 \n
    7: 디자인파트 \n
    8: 안드로이드파트장 \n
    9: iOS파트장 \n
    10: 웹파트장 \n
    11: 서버파트장 \n
    12: 개발파트장 \n
    13: 클라이언트파트장 \n
    `,
  })
  @ApiOkResponse({
    description: '기수별 연혁 조회 성공',
    type: HistoryGetSuccess,
  })
  @ApiInternalServerErrorResponse({
    description: '서버 내부 오류입니다.',
    type: InternalServerError,
  })
  async getHistoryBySemester(@Param() param: SemesterTargetDTO) {
    const data = await this.historyService.getHistoryBySemester(param.semesterId);
    return ResponseEntity.OK_WITH_DATA(rm.READ_HISTORY_SUCCESS, data);
  }
}
