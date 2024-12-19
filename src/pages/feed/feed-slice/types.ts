import { OrderInfo } from '@components';
import { TOrder } from '@utils-types';
import { TPendingProps } from '../../../services/types';

export interface TFeed extends TPendingProps {
  orders: TOrder[];
  feed: {
    total: number;
    totalToday: number;
  };
  userOrders: TOrder[];
  loadingUser: boolean;
}
export const FeedInitial = {
  orders: [],
  isLoading: false,
  error: '',
  info: {
    totalToday: 0,
    total: 0
  }
};
