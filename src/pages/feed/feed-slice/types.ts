import { OrderInfo } from '@components';
import { TOrder } from '@utils-types';

export type TFeed = {
  orders: TOrder[];

  isLoading: boolean;
  error: string;
  feed: {
    total: number;
    totalToday: number;
  };
};
export const FeedInitial = {
  orders: [],
  isLoading: false,
  error: '',
  info: {
    totalToday: 0,
    total: 0
  }
};
