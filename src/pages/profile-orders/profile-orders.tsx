import { getFeedsApi } from '@api';
import { setFeed, setFeedLoading } from '@slices';
import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../services/store';

export const ProfileOrders: FC = () => {
  const orders = useSelector((state: RootState) => state.feed.orders);

  return <ProfileOrdersUI orders={orders} />;
};
