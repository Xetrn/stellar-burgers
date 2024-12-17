import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  resetSelect,
  selectConstructorItems
} from '../../pages/constructor-page/constructor-slice/constructor.slice';
import { getFeed } from '../order-info/order-info-slice/getFeed';
import { postOrder } from '../order-card/order-card-slice/postOrder';
import { selectOrder } from '../order-info/order-info-slice/order-modal-slice';
import {
  resetData,
  selectOrderModalData,
  selectOrderRequest
} from '../order-card/order-card-slice/order-card-slice';

import { selectIsAuthenticated } from '../../services/user-slice/user.slice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const auth = useSelector(selectIsAuthenticated);

  const nav = useNavigate();

  const dispatch = useDispatch();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!auth) {
      nav('/login');
      return;
    }

    const orderIngredients = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map(({ _id }: TIngredient) => _id),
      constructorItems.bun._id
    ];
    dispatch(postOrder(orderIngredients));
  };

  const closeOrderModal = () => {
    dispatch(resetData());
    dispatch(resetSelect());
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
