import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersUser } from '../../services/slices/userOrderSlice';
import { AppDispatch, RootState } from '../../services/store';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch: AppDispatch = useDispatch();
  const orders: TOrder[] = useSelector(
    (state: RootState) => state.userOrder.orders
  );
  useEffect(() => {
    dispatch(getOrdersUser());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
