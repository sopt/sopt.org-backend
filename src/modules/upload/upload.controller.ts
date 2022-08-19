import { Body, Controller, Post, UploadedFiles } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { rm } from 'src/common/constants';
import { ResponseEntity } from 'src/common/constants/responseEntity';
import { ApiImageFiles } from 'src/common/decorators/api-file.decorator';
import { AwsS3Service } from 'src/config/services/aws-s3.service';
import { SemesterTargetDTO } from '../history/dto/semester-target.dto';
import { UploadService } from './upload.service';

@ApiExcludeController()
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService, private readonly awsS3Service: AwsS3Service) {}

  @Post('logo')
  @ApiImageFiles('logo')
  async uploadImage(@UploadedFiles() files: Express.MulterS3.File[], @Body() dto: SemesterTargetDTO) {
    const images = files.map((file) => this.awsS3Service.getImageUrl(file));
    await this.uploadService.createLogos(dto.semesterId, images);
    return ResponseEntity.CREATED_WITH(`${images.length}개의 ${rm.UPLOAD_IMAGES_SUCCESS}`);
  }
}
