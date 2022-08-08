import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LogosService {
  constructor(private readonly prisma: PrismaService) {}

  //TODO 로고 조회
}
