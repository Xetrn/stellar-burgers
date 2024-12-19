import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectLoadingUser,
  selectUserOrders
} from '../feed/feed-slice/feed.slice';
import { getUserOrders } from '../feed/feed-slice/actions';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector(selectUserOrders);
  const isLoading = useSelector(selectLoadingUser);

  useEffect(() => {
    if (!orders.length) {
      dispatch(getUserOrders());
    }
  }, [dispatch, orders.length]);

  return isLoading ? <Preloader /> : <ProfileOrdersUI orders={orders} />;
};
