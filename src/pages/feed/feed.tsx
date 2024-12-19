import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectFeedOrders,
  getFeeds
} from '../../services/slices/ordersFeedSlice';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(selectFeedOrders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  const handleGetFeeds = () => {
    dispatch(getFeeds());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
