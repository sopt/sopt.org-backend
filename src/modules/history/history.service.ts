import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HistoryGetResDTO } from './dto/history-get.res.dto';
import { HistoryPartnersGetResDTO } from './dto/history-partners-get.res.dto';

@Injectable()
export class HistoryService {
  constructor(private readonly prisma: PrismaService) {}

  //* 기수별 연혁 조회
  async getHistoryBySemester(semesterId: number) {
    const semester = await this.prisma.semester.findFirst({
      where: {
        id: semesterId,
      },
      include: {
        leaders: {
          where: {
            semesterId,
          },
          include: {
            part: true,
          },
          orderBy: {
            partId: 'asc',
          },
        },
        members: {
          where: {
            semesterId,
          },
          include: {
            part: true,
          },
          orderBy: {
            partId: 'asc',
          },
        },
      },
    });

    return new HistoryGetResDTO(semester, semester.leaders, semester.members);
  }

  //* 협력사 조회
  async getHistoryPartners() {
    const projects = await this.prisma.project.findMany();
    const partners = await this.prisma.partner.findMany();

    return new HistoryPartnersGetResDTO(projects, partners);
  }
}
