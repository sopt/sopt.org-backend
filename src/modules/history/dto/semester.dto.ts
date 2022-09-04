import { ApiProperty } from '@nestjs/swagger';
import { Semester } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class SemesterDTO {
  @ApiProperty({ nullable: true }) @Exclude() private readonly mainLogo: string;
  @ApiProperty({ nullable: true }) @Exclude() private readonly mainColor: string;
  @ApiProperty({ nullable: true }) @Exclude() private readonly backgroundLogo: string;
  @ApiProperty() @Exclude() private readonly number: number;
  @ApiProperty({ nullable: true }) @Exclude() private readonly signature: string;
  @ApiProperty({ nullable: true }) @Exclude() private readonly year: number;
  @ApiProperty({ nullable: true }) @Exclude() private readonly semester: number;

  constructor(semester: Semester) {
    this.mainLogo = semester.logo ? semester.logo : null;
    this.mainColor = semester.color ? `#${semester.color}` : null;
    this.backgroundLogo = semester.background ? semester.background : null;
    this.number = semester.id;
    this.signature = semester.name ? semester.name : null;
    this.year = semester.year ? +semester.year.split('-')[0] : null;
    this.semester = semester.year ? +semester.year.split('-')[1] : null;
  }
}
