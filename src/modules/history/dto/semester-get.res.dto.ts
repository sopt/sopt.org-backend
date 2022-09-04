import { ApiProperty } from '@nestjs/swagger';
import { Semester } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { SemesterDTO } from './semester.dto';

export class SemesterGetResDTO {
  @ApiProperty() @Exclude() private readonly page: number;
  @ApiProperty() @Exclude() private readonly limit: number;
  @ApiProperty() @Exclude() private readonly total: number;
  @ApiProperty({ type: SemesterDTO, isArray: true }) @Exclude() private readonly semesters: SemesterDTO[];

  constructor(page: number, limit: number, total: number, semesters: Semester[]) {
    this.page = page;
    this.limit = limit;
    this.total = total;
    this.semesters = semesters.map((semester) => new SemesterDTO(semester));
  }
}
