import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, useSelector } from '../../../src/services/store';
import { getFeeds } from '../../../src/services/thunks';

export const Feed: FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector(state => state.feedsReducer.orders);
  
  useEffect(() => {
    dispatch(getFeeds());
    const updatePageInterval = setInterval(() => {
      dispatch(getFeeds());
    }, 5000)
    return () => clearInterval(updatePageInterval);
  }, [])

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => {dispatch(getFeeds())}} />;
};
