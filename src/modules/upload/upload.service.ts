import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadPartnersPosterBodyDTO } from './dto/upload-partners-poster.body.dto';

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

  async createPartnersPoster(dto: UploadPartnersPosterBodyDTO, image: string) {
    await this.prisma.project.create({
      data: {
        ...dto,
        posterImage: image,
      },
    });
  }
}
