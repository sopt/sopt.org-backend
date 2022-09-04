import { Module } from '@nestjs/common';
import { AwsS3Service } from 'src/config/services/aws-s3.service';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService, AwsS3Service],
})
export class UploadModule {}
