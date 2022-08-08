import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import * as AWS from 'aws-sdk';
import { ValidatorConstraint } from 'class-validator';
import multerS3 from 'multer-s3-transform';
import { nanoid } from 'nanoid';
import path from 'path';
import { ApiConfigService } from 'src/config/services/api-config.service';

@ValidatorConstraint({ name: 'ApiFile', async: true })
class FileOption {
  private readonly confing = new ApiConfigService(new ConfigService());
  private static instance: FileOption;
  private _s3: AWS.S3;

  private constructor() {
    this._s3 = new AWS.S3({
      accessKeyId: this.confing.awsS3Config.bucketAccessKey,
      secretAccessKey: this.confing.awsS3Config.bucketSecretKey,
      region: this.confing.awsS3Config.bucketRegion,
    });
  }

  static getInstance() {
    if (this.instance) return this.instance;
    this.instance = new FileOption();

    return this.instance;
  }

  get s3() {
    return this._s3;
  }
}

export const ApiFile = (dirName: string) => {
  return applyDecorators(
    ApiConsumes('multipart/form-data'),
    UseInterceptors(
      FileInterceptor('file', {
        storage: multerS3({
          s3: FileOption.getInstance().s3,
          bucket: process.env.AWS_BUCKET,
          contentType: multerS3.AUTO_CONTENT_TYPE,
          shouldTransform: true,
          transforms: [
            {
              id: 'resized',
              key: (req: Express.Request, file: Express.MulterS3.File, cb: any) => {
                const extension = path.extname(file.originalname);
                cb(null, `images/${dirName}/${Date.now()}_${nanoid()}${extension}`);
              },
              //TODO 이미지 resize
              // transform: (req: Express.Request, file: Express.MulterS3.File, cb: any) => {
              //   cb(null, sharp().resize(200, 200));
              // },
            },
          ],
        }),
      }),
    ),
  );
};
