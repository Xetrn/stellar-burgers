import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import {
  getUserOrders,
  getUserOrdersRequest,
  isLoadingGetUserOrders
} from '../../services/slices/user-orders';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector(getUserOrders);
  const isLoading = useSelector(isLoadingGetUserOrders);

  useEffect(() => {
    dispatch(getUserOrdersRequest());
  }, []);

  return <ProfileOrdersUI orders={orders} isLoading={isLoading} />;
};
