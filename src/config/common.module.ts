import { Global, Module } from '@nestjs/common';
import { ApiConfigService } from './services/api-config.service';
import { AwsS3Service } from './services/aws-s3.service';
import { ImageValidatorService } from './services/image-validator.service';

const providers = [ApiConfigService, AwsS3Service, ImageValidatorService];

@Global()
@Module({
  providers,
  imports: [],
  exports: [...providers],
})
export class CommonModule {}
