import { Transform } from 'class-transformer';

export const TransformEmptyToNull = () => {
  return Transform(({ value }) => (value === '' ? null : value));
};
