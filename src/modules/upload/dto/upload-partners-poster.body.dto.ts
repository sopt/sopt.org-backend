import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { TransformEmptyToNull } from 'src/common/decorators/empty-to-null.decorator';

export class UploadPartnersPosterBodyDTO {
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsString()
  @IsOptional()
  @TransformEmptyToNull()
  title: string;

  @IsString()
  @IsOptional()
  @TransformEmptyToNull()
  content: string;

  @IsString()
  @IsOptional()
  @TransformEmptyToNull()
  subContent: string;
}
