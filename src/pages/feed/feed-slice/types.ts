import { OrderInfo } from '@components';
import { TOrder } from '@utils-types';

export type TFeed = {
  orders: TOrder[];

  isLoading: boolean;
  error: string | undefined;
  feed: {
    total: number;
    totalToday: number;
  };
  userOrders: TOrder[];
  loadingUser: boolean;
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
