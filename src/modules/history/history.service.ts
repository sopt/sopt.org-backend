import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { HistoryGetResDTO } from './dto/history-get.res.dto';
import { HistoryPartnersGetResDTO } from './dto/history-partners-get.res.dto';
import { SemesterGetResDTO } from './dto/semester-get.res.dto';

@Injectable()
export class HistoryService {
  constructor(private readonly prisma: PrismaService) {}

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

  async getHistoryPartners() {
    const projects = await this.prisma.project.findMany({
      orderBy: {
        id: 'asc',
      },
    });
    const partners = await this.prisma.partner.findMany({
      orderBy: {
        id: 'asc',
      },
    });

    return new HistoryPartnersGetResDTO(projects, partners);
  }

  async getAllSemester(page: number, limit: number) {
    const total = await this.prisma.semester.count();
    const semesters = await this.prisma.semester.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        id: 'desc',
      },
    });

    return new SemesterGetResDTO(page, limit, total, semesters);
  }
}
