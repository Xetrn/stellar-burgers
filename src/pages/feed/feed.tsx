import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getAllFeeds, getOrdersFeed } from '../../services/slices/feeds';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector(getOrdersFeed);

  useEffect(() => {
    dispatch(getAllFeeds());
  }, []);

  const handleGetAllFeeds = useCallback(() => {
    dispatch(getAllFeeds());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetAllFeeds} />;
};
