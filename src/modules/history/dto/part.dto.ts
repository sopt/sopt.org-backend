import { ApiProperty } from '@nestjs/swagger';
import { Part } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class PartDTO {
  @ApiProperty() @Exclude() private readonly name: string;
  @ApiProperty() @Exclude() private readonly count: number;

  constructor(part: Part, memberCount: number) {
    this.name = part.name;
    this.count = memberCount;
  }
}
