import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import { takeRandom } from 'src/common/helpers/arrayFormatter';
import { PrismaService } from '../prisma/prisma.service';
import { LogoGetResDTO } from './dto/logo-get.res.dto';

@Injectable()
export class LogoService {
  constructor(private readonly prisma: PrismaService) {}

  async getLogos() {
    const lastSemester = await this.getLastSemester();
    const lastLogos = await this.prisma.logo.findMany({
      where: {
        semesterId: { in: [lastSemester, lastSemester - 1] },
      },
      orderBy: {
        semesterId: 'desc',
      },
    });

    if (lastLogos.length < 60) {
      const logos = await this.prisma.logo.findMany({
        where: {
          semesterId: { in: [lastSemester - 2, lastSemester - 3] },
        },
      });
      const remainLogos = takeRandom(logos, 60 - lastLogos.length);

      return _.union(lastLogos, remainLogos).map((logo) => new LogoGetResDTO(logo));
    }
    return lastLogos.map((logo) => new LogoGetResDTO(logo));
  }

  private async getLastSemester() {
    const aggregation = await this.prisma.logo.aggregate({
      _max: {
        semesterId: true,
      },
    });

    return aggregation._max.semesterId;
  }
}
