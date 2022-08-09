import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import { PrismaService } from '../prisma/prisma.service';
import { LogosGetResDTO } from './dto/logos-get.res.dto';

@Injectable()
export class LogosService {
  constructor(private readonly prisma: PrismaService) {}

  //* 로고 조회
  async getLogos() {
    const logos = await this.prisma.logo.findMany();

    return _.shuffle(logos).map((logo) => new LogosGetResDTO(logo));
  }
}
