import { ApiProperty } from '@nestjs/swagger';
import { Logo } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class LogosGetResDTO {
  @ApiProperty() @Exclude() private readonly id: number;
  @ApiProperty() @Exclude() private readonly image: string;

  constructor(logo: Logo) {
    this.id = logo.id;
    this.image = logo.image;
  }
}
