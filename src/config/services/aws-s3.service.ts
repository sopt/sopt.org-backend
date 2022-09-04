import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import multerS3 from 'multer-s3-transform';
import path from 'path';
import sharp from 'sharp';
import { formatFilename } from 'src/common/helpers/stringFormatter';
import { UploadType } from 'src/modules/upload/common/upload.type';
import { ApiConfigService } from './api-config.service';
@Injectable()
export class AwsS3Service {
  constructor(private readonly config: ApiConfigService) {}

  storage(dirName: UploadType) {
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
            const basename = path.basename(file.originalname, '.png');

            switch (dirName) {
              case 'leader':
              case 'semester/logo':
              case 'semester/background':
              case 'semester/core':
                cb(null, `mainpage/${dirName}/${formatFilename(basename)}${extension}`);
                break;
            }
          },
          transform: (req: Express.Request, file: Express.MulterS3.File, cb: any) => {
            cb(null, sharp().webp());
          },
        },
      ],
    });
  }

  getImageUrl(file: any): string {
    return file.transforms[0].location;
  }
}
