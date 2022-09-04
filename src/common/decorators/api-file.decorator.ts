import { UploadType } from 'src/modules/upload/common/upload.type';
import { imageFileFilter, imageFilesFilter } from '../exceptions/file-mimetype.filter';
import { ApiFile, ApiFiles } from './file.decorator';

export const ApiImageFile = (path: UploadType) => {
  return ApiFile(path, imageFileFilter);
};

export const ApiImageFiles = (path: UploadType) => {
  return ApiFiles(path, imageFilesFilter);
};
