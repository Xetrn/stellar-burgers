import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { getBurger, clearIngredients } from '../../services/constructorSlice';
import {
  clearOrder,
  createOrder,
  getLoading,
  getOrder
} from '../../services/ordersSlice';
import { getAuthUser } from '../../services/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const constructorItems = useSelector(getBurger);
  const orderRequest = useSelector(getLoading);
  const orderModalData = useSelector(getOrder);
  const user = useSelector(getAuthUser);
  const navigate = useNavigate();
  const location = useLocation();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login', { replace: true, state: { from: location } });
      return;
    }

    const burgerIngredients = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];

    dispatch(createOrder(burgerIngredients));
  };

  const closeOrderModal = () => {
    dispatch(clearIngredients());
    dispatch(clearOrder());
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
