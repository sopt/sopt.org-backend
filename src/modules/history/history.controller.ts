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
