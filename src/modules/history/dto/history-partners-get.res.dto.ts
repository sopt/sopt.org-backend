import { ApiProperty } from '@nestjs/swagger';
import { Partner, Project } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { PartnerDTO } from './partner.dto';
import { ProjectDTO } from './project.dto';

export class HistoryPartnersGetResDTO {
  @ApiProperty({ type: ProjectDTO, isArray: true }) @Exclude() private readonly projects: ProjectDTO[];
  @ApiProperty({ type: PartnerDTO, isArray: true }) @Exclude() private readonly partners: PartnerDTO[];

  constructor(projects: Project[], partners: Partner[]) {
    this.projects = projects.map((project) => new ProjectDTO(project));
    this.partners = partners.map((partner) => new PartnerDTO(partner));
  }
}
