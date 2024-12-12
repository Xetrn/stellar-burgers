import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { ordersSelector, fetchFeeds } from '../../services/slices/feedsSlice';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(ordersSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFeeds());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
