import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchMyOrders, getMyOrders } from '@slices';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector(getMyOrders);

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
