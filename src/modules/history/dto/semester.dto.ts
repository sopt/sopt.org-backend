import { ApiProperty } from '@nestjs/swagger';
import { Semester } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { formatSemesterYear } from 'src/common/helpers/stringFormatter';

export class SemesterDTO {
  @ApiProperty() @Exclude() private readonly id: number;
  @ApiProperty({ nullable: true }) @Exclude() private readonly color: string;
  @ApiProperty({ nullable: true }) @Exclude() private readonly logo: string;
  @ApiProperty({ nullable: true }) @Exclude() private readonly background: string;
  @ApiProperty({ nullable: true }) @Exclude() private readonly name: string;
  @ApiProperty() @Exclude() private readonly year: string;

  constructor(semester: Semester) {
    this.id = semester.id;
    this.color = semester.color ? `#${semester.color}` : null;
    this.logo = semester.logo ? semester.logo : null;
    this.background = semester.background ? semester.background : null;
    this.name = semester.name ? semester.name : null;
    this.year = semester.year ? formatSemesterYear(semester.year) : null;
  }
}
