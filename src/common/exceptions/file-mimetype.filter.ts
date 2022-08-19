import { BadRequestException } from '@nestjs/common';
import { rm } from '../constants';

export const imageFileFilter = (req: Express.Request, file: Express.MulterS3.File, cb: any) => {
  file.mimetype.startsWith('image') ? cb(null, true) : cb(new BadRequestException(rm.NO_IMAGE_TYPE), false);
};

export const imageFilesFilter = (req: Express.Request, file: Express.MulterS3.File, cb: any) => {
  file.mimetype.startsWith('image') ? cb(null, true) : cb(null, false);
};
