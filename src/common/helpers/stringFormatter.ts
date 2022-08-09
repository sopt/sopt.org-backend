import { Part } from '@prisma/client';

export const formatLeaderPart = (part: Part) => {
  return part.id < 6 ? part.name : `${part.name}장`;
};
