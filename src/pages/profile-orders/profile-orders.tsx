import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getUserOrders,
  selectOrderList
} from '../../services/slices/userOrdersSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrders());
  });
  const orders: TOrder[] = useSelector(selectOrderList);

  return <ProfileOrdersUI orders={orders} />;
};
