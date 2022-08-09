import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import { PrismaService } from '../prisma/prisma.service';
import { LogoGetResDTO } from './dto/logo-get.res.dto';

@Injectable()
export class LogoService {
  constructor(private readonly prisma: PrismaService) {}

  //* 로고 조회
  async getLogos() {
    const logos = await this.prisma.logo.findMany();

    return _.shuffle(logos).map((logo) => new LogoGetResDTO(logo));
  }
}
