import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import {
  clearAll,
  constructorSelector
} from '../../services/slices/constructorIngredientSlice';
import { useDispatch, useSelector } from '../../services/store';
import {
  placeNewOrder,
  getOrderModalData,
  getOrderRequest,
  resetOrder
} from '../../services/slices/newOrderSlice';
import { isAuthCheckedSelector } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(isAuthCheckedSelector);

  const constructorItems = useSelector(constructorSelector.selectItems);

  const orderRequest = useSelector(getOrderRequest);

  const orderModalData = useSelector(getOrderModalData);

  const onOrderClick = () => {
    if (!isAuth) {
      return navigate('/login');
    }

    if (!constructorItems.bun || orderRequest) return;

    const orderData = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id)
    ];

    dispatch(placeNewOrder(orderData));
  };

  const closeOrderModal = () => {
    dispatch(resetOrder());
    dispatch(clearAll());
    navigate('/');
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
