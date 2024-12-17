import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../../src/services/store';
import { getOrders } from '../../../src/services/thunks';

export const ProfileOrders: FC = () => {
  
  const dispatch = useDispatch();
  const orders = useSelector(state => state.ordersReducer.orders);


  useEffect(() => {
    dispatch(getOrders());
    const getOrdersInterval = setInterval(() => {
      dispatch(getOrders());
    }, 10000)
    return () => clearInterval(getOrdersInterval);
  }, [])



  return <ProfileOrdersUI isOrdersRequest={false} orders={orders} />;
};
