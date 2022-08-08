import { BadRequestException, Injectable } from '@nestjs/common';
import { rm } from 'src/common/constants';
import { ApiConfigService } from './api-config.service';
import { ImageValidatorService } from './image-validator.service';

@Injectable()
export class AwsS3Service {
  constructor(private readonly config: ApiConfigService, private readonly imageValidator: ImageValidatorService) {}

  uploadFile(file: any) {
    if (!this.imageValidator.isImage(file.mimetype)) {
      throw new BadRequestException(rm.NO_IMAGE_TYPE);
    }
    return this.getCachingUrl(file.transforms[0].location);
  }

  getCachingUrl(url: string) {
    return url.replace(`${this.config.imageConfig.baseUrl}`, `${this.config.imageConfig.cacheUrl}`);
  }
}
