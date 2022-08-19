import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UploadService {
  constructor(private readonly prisma: PrismaService) {}

  async createLogos(semesterId: number, images: string[]) {
    const data = images.map((image) => {
      return { semesterId, image };
    });

    await this.prisma.logo.createMany({
      data,
    });
  }
}
