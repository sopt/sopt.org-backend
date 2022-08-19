import _ from 'lodash';

export const takeRandom = (array: any[], count: number) => {
  const shuffle = _.shuffle(array);
  return _.take(shuffle);
};
