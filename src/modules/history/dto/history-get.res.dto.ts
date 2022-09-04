import { ApiProperty } from '@nestjs/swagger';
import { Semester } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { LeaderPart, MemberPart } from '../common/histoty.type';
import { LeaderDTO } from './leader.dto';
import { MemberDTO } from './member.dto';

export class HistoryGetResDTO {
  @ApiProperty() @Exclude() private readonly id: number;
  @ApiProperty({ nullable: true }) @Exclude() private readonly history: string;
  @ApiProperty({ type: LeaderDTO, isArray: true }) @Exclude() private readonly leaders: LeaderDTO[];
  @ApiProperty() @Exclude() private readonly member: MemberDTO;

  constructor(semester: Semester, leaders: LeaderPart[], members: MemberPart[]) {
    this.id = semester.id;
    this.history = semester.history;
    this.member = new MemberDTO(members);
    this.leaders = leaders.map((leader) => new LeaderDTO(leader));
  }
}
