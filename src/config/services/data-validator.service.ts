import { Injectable, NotFoundException } from '@nestjs/common';
import { rm } from 'src/common/constants';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class DataValidatorService {
  constructor(private readonly prisma: PrismaService) {}

  async checkNotFoundSemester(semesterId: number) {
    const post = await this.prisma.semester.findUnique({
      where: {
        id: semesterId,
      },
    });

    if (!post) {
      throw new NotFoundException(rm.NO_SEMESTER);
    }
  }
}
