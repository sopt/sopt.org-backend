import { IsNotEmpty, IsNumber } from 'class-validator';

export class UploadSheetReqDTO {
  @IsNotEmpty()
  @IsNumber()
  startRange: number;

  @IsNotEmpty()
  @IsNumber()
  endRange: number;
}
