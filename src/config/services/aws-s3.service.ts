import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import multerS3 from 'multer-s3-transform';
import { nanoid } from 'nanoid';
import path from 'path';
import sharp from 'sharp';
import { ApiConfigService } from './api-config.service';
@Injectable()
export class AwsS3Service {
  constructor(private readonly config: ApiConfigService) {}

  storage(dirName: string, type?: string) {
    return multerS3({
      s3: new AWS.S3({
        accessKeyId: this.config.awsS3Config.bucketAccessKey,
        secretAccessKey: this.config.awsS3Config.bucketSecretKey,
        region: this.config.awsS3Config.bucketRegion,
      }),
      bucket: this.config.awsS3Config.bucket,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      shouldTransform: true,
      transforms: [
        {
          id: 'resized',
          key: (req: Express.Request, file: Express.MulterS3.File, cb: any) => {
            const extension = path.extname(file.originalname);
            !type
              ? cb(null, `images/${dirName}/${Date.now()}_${nanoid()}${extension}`)
              : cb(null, `images/${dirName}/${file.originalname}`);
          },
          transform: (req: Express.Request, file: Express.MulterS3.File, cb: any) => {
            cb(null, sharp().webp().resize(800, 800));
          },
        },
      ],
    });
  }

  getImageUrl(file: any) {
    const url = file.transforms[0].location;
    return url.replace(`${this.config.imageConfig.baseUrl}`, `${this.config.imageConfig.cacheUrl}`);
  }
}
