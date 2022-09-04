import { imageFileFilter, imageFilesFilter } from '../exceptions/file-mimetype.filter';
import { ApiFile, ApiFiles } from './file.decorator';

export const ApiImageFile = (path: string) => {
  return ApiFile(path, imageFileFilter);
};

export const ApiImageFiles = (path: string) => {
  return ApiFiles(path, imageFilesFilter);
};
