import { IsOptional, IsString } from 'class-validator';
import { TransformEmptyToNull } from 'src/common/decorators/empty-to-null.decorator';

export class UploadPartnersLogoBodyDTO {
  @IsString()
  @IsOptional()
  @TransformEmptyToNull()
  name: string;
}
