import { Body, Controller, Post, UploadedFile, UploadedFiles } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { rm } from 'src/common/constants';
import { ResponseEntity } from 'src/common/constants/responseEntity';
import { ApiImageFile, ApiImageFiles } from 'src/common/decorators/api-file.decorator';
import { AwsS3Service } from 'src/config/services/aws-s3.service';
import { SemesterTargetDTO } from '../history/dto/semester-target.dto';
import { UploadPartnersPosterBodyDTO } from './dto/upload-partners-poster.body.dto';
import { UploadService } from './upload.service';

@ApiExcludeController()
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService, private readonly awsS3Service: AwsS3Service) {}

  @Post('logo')
  @ApiImageFiles('logo')
  async uploadLogo(@UploadedFiles() files: Express.MulterS3.File[], @Body() dto: SemesterTargetDTO) {
    const images = files.map((file) => this.awsS3Service.getImageUrl(file));
    await this.uploadService.createLogos(dto.semesterId, images);
    return ResponseEntity.CREATED_WITH(rm.UPLOAD_LOGO_SUCCESS);
  }

  @Post('partners/poster')
  @ApiImageFile('partners/poster')
  async uploadPartnersPoster(@UploadedFile() file: Express.MulterS3.File, @Body() dto: UploadPartnersPosterBodyDTO) {
    const image = this.awsS3Service.getImageUrl(file);
    await this.uploadService.createPartnersPoster(dto, image);
    return ResponseEntity.CREATED_WITH(rm.UPLOAD_PARTNERS_POSTER_SUCCESS);
  }
}
