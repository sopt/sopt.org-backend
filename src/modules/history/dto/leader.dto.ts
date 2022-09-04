import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { formatLeaderPart } from 'src/common/helpers/stringFormatter';
import { LeaderPart } from '../common/histoty.type';

export class LeaderDTO {
  @ApiProperty() @Exclude() private readonly id: number;
  @ApiProperty() @Exclude() private readonly part: string;
  @ApiProperty() @Exclude() private readonly name: string;
  @ApiProperty({ nullable: true }) @Exclude() private readonly content: string;
  @ApiProperty({ nullable: true }) @Exclude() private readonly image: string;

  constructor(leader: LeaderPart) {
    this.id = leader.partId;
    this.part = formatLeaderPart(leader.part);
    this.name = leader.name;
    this.content = leader.content;
    this.image = leader.image;
  }
}
