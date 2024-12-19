import { FC, useMemo, useState } from 'react';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  selectOrderLoading,
  createOrder,
  fetchOrders
} from '../../services/ordersSlice';
import { useDispatch, useSelector } from '../../services/store';
import { selectIsAuthenticated } from '../../services/userSlice';
import { selectBuilder, clearBuilder } from '../../services/builderSlice';
import { fetchFeeds } from '../../services/feedsSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const constructorItems = useSelector(selectBuilder);
  const orderRequest = useSelector(selectOrderLoading);
  const [orderModalData, setOrderModalData] = useState<TOrder | null>(null);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    const ingredientsIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    dispatch(createOrder(ingredientsIds))
      .unwrap()
      .then((orderData) => {
        setOrderModalData(orderData.order);
        dispatch(fetchFeeds());
        dispatch(fetchOrders());
      });
  };

  const closeOrderModal = () => {
    setOrderModalData(null);
    dispatch(clearBuilder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
