import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageValidatorService {
  public isImage(mimeType: string): boolean {
    const correctImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic'];

    return correctImageTypes.includes(mimeType);
  }
}
