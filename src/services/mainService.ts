import { MainGetResDto } from "../interfaces/dto/mainDto";
import prisma from "./prismaService";

const getLogoImages = async () => {
  try {
    const logoImages: MainGetResDto[] = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, logoImage: true },
    });

    return logoImages;
  } catch (error) {
    return null;
  }
};

export default {
  getLogoImages,
};
