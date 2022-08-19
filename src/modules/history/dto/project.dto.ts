import { ApiProperty } from '@nestjs/swagger';
import { Project } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class ProjectDTO {
  @ApiProperty() @Exclude() private readonly id: number;
  @ApiProperty({ nullable: true }) @Exclude() private readonly year: number;
  @ApiProperty({ nullable: true }) @Exclude() private readonly title: string;
  @ApiProperty({ nullable: true }) @Exclude() private readonly content: string;
  @ApiProperty({ nullable: true }) @Exclude() private readonly subContent: string;
  @ApiProperty({ nullable: true }) @Exclude() private readonly posterImage: string;

  constructor(project: Project) {
    this.id = project.id;
    this.year = project.year;
    this.title = project.title;
    this.content = project.content;
    this.subContent = project.subContent;
    this.posterImage = project.posterImage;
  }
}
