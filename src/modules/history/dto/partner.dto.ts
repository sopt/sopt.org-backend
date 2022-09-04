import { ApiProperty } from '@nestjs/swagger';
import { Partner } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class PartnerDTO {
  @ApiProperty() @Exclude() private readonly id: number;
  @ApiProperty({ nullable: true }) @Exclude() private readonly name: string;
  @ApiProperty({ nullable: true }) @Exclude() private readonly image: string;

  constructor(partner: Partner) {
    this.id = partner.id;
    this.name = partner.name;
    this.image = partner.image;
  }
}
