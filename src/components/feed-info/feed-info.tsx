import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import {
  selectTotalOrders,
  selectFeedOrders,
  selectTotalOrdersToday
} from '../../services/slices/ordersFeedSlice';
import { useSelector } from '../../services/store';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders: TOrder[] = useSelector(selectFeedOrders);

  const totalFeeds = useSelector(selectTotalOrders);
  const totalToodayFeeds = useSelector(selectTotalOrdersToday);
  const feed = { total: totalFeeds, totalToday: totalToodayFeeds };

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
