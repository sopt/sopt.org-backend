import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import _ from 'lodash';
import { MemberPart } from '../common/histoty.type';
import { PartDTO } from './part.dto';

export class MemberDTO {
  @ApiProperty() @Exclude() private readonly total: number;
  @ApiProperty({ type: PartDTO, isArray: true }) @Exclude() private readonly parts: PartDTO[];

  constructor(members: MemberPart[]) {
    this.total = _.sumBy(members, 'count');
    this.parts = members.map((member) => new PartDTO(member.part, member.count));
  }
}
