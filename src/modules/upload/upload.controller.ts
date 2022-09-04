import { Controller, Post, UploadedFiles } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { rm } from 'src/common/constants';
import { ResponseEntity } from 'src/common/constants/responseEntity';
import { ApiImageFiles } from 'src/common/decorators/api-file.decorator';
import { AwsS3Service } from 'src/config/services/aws-s3.service';
import { UploadService } from './upload.service';

@ApiExcludeController()
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService, private readonly awsS3Service: AwsS3Service) {}

  //* 임원진 파일 업로드
  @Post('leader')
  @ApiImageFiles('leader')
  async uploadLeader(@UploadedFiles() files: Express.MulterS3.File[]) {
    return ResponseEntity.CREATED_WITH(rm.UPLOAD_LEADER_SUCCESS);
  }

  //* 기수 로고 파일 업로드
  @Post('semester/logo')
  @ApiImageFiles('semester/logo')
  async uploadSemesterLogo(@UploadedFiles() files: Express.MulterS3.File[]) {
    return ResponseEntity.CREATED_WITH(rm.UPLOAD_SEMESTER_LOGO_SUCCESS);
  }

  //* 기수 로고 파일 업로드
  @Post('semester/background')
  @ApiImageFiles('semester/background')
  async uploadSemesterBackground(@UploadedFiles() files: Express.MulterS3.File[]) {
    return ResponseEntity.CREATED_WITH(rm.UPLOAD_SEMESTER_BACKGROUND_SUCCESS);
  }

  //* 기수 핵심가치 파일 업로드
  @Post('semester/core')
  @ApiImageFiles('semester/core')
  async uploadSemesterCore(@UploadedFiles() files: Express.MulterS3.File[]) {
    return ResponseEntity.CREATED_WITH(rm.UPLOAD_SEMESTER_CORE_SUCCESS);
  }

  //TODO 임원진 데이터 업로드
  // @Post('sheet/leader/:semesterId')
  // async uploadPost(@Body() dto: UploadSheetReqDTO) {
  //   await this.uploadService.uploadLeader(dto);
  //   return ResponseEntity.OK_WITH(rm.UPLOAD_LEADER_SUCCESS);
  // }
}
