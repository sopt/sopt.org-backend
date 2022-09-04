import { Part } from '@prisma/client';

export const formatLeaderPart = (part: Part) => {
  return part.id < 6 ? part.name : `${part.name}장`;
};

export const formatFilename = (basename: string) => {
  return basename.replace(/\ /g, '').replace(/[,=]/g, '_');
};

export const formatSemesterYear = (value: string) => {
  const [year, semester] = value.split('-');
  return semester === '1' ? `${year} 상반기` : `${year} 하반기`;
};
