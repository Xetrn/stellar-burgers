import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '@ui';

import { useSelector } from '../../services/store';
import {
  getOrdersFeed,
  getTotalFeed,
  getTotalTodayFeed
} from '../../services/slices/feedSlice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders: TOrder[] = useSelector(getOrdersFeed);
  const totalFeeds = useSelector(getTotalFeed);
  const totalToday = useSelector(getTotalTodayFeed);
  const feed = {
    total: totalFeeds,
    totalToday: totalToday
  };

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
