import { MAX_STAT_VALUE } from '@/utils/constants';

export const getStatPercentage = (value: number): number => {
  return Math.min((value / MAX_STAT_VALUE) * 100, 100);
};
