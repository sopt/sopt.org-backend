import { ApiProperty } from '@nestjs/swagger';
import { Semester } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { split } from 'lodash';
import { LeaderPart, MemberPart } from '../common/histoty.type';
import { LeaderDTO } from './leader.dto';
import { MemberDTO } from './member.dto';

export class HistoryGetResDTO {
  @ApiProperty() @Exclude() private readonly id: number;
  @ApiProperty({ nullable: true }) @Exclude() private readonly color: string;
  @ApiProperty({ isArray: true }) @Exclude() private readonly coreValue: string[];
  @ApiProperty({ isArray: true }) @Exclude() private readonly coreImage: string[];
  @ApiProperty({ nullable: true }) @Exclude() private readonly history: string;
  @ApiProperty({ type: LeaderDTO, isArray: true }) @Exclude() private readonly leaders: LeaderDTO[];
  @ApiProperty() @Exclude() private readonly member: MemberDTO;

  constructor(semester: Semester, leaders: LeaderPart[], members: MemberPart[]) {
    this.id = semester.id;
    this.color = semester.color ? `#${semester.color}` : null;
    this.coreValue = semester.coreValue ? split(semester.coreValue, '\n') : null;
    this.coreImage = semester.coreImage ? split(semester.coreImage, ', ') : null;
    this.history = semester.history;
    this.member = new MemberDTO(members);
    this.leaders = leaders.map((leader) => new LeaderDTO(leader));
  }
}
