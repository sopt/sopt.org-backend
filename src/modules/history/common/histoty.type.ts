import { Leader, Member, Part } from '@prisma/client';

export type LeaderPart = Leader & { part: Part };
export type MemberPart = Member & { part: Part };

export const part = {
  1: '회장',
  2: '부회장',
  3: '총무',
  4: '운영팀장',
  5: '미디어팀장',
  6: '기획파트',
  7: '디자인파트',
  8: '안드로이드파트',
  9: 'iOS파트',
  10: '웹파트',
  11: '서버파트',
  12: '개발파트',
  13: '클라이언트파트',
};
