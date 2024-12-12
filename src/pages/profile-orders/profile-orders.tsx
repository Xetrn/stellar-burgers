import { ProfileOrdersUI } from '@ui-pages';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/services/store';

export const ProfileOrders: FC = () => {
  const orders = useSelector((state: RootState) => state.feed.orders);

  return <ProfileOrdersUI orders={orders} />;
};
