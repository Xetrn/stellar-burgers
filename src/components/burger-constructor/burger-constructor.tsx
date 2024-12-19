import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  constructorSelector,
  resetConstructor
} from '../../services/slices/orderConstructorSlice';
import {
  selectOrderDetails,
  selectOrderRequestStatus,
  resetOrderState,
  createOrder
} from '../../services/slices/createOrderSlice';
import { selectAuthStatus } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const isAuth = useSelector(selectAuthStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(constructorSelector.selectItems);
  const orderRequest = useSelector(selectOrderRequestStatus);
  const orderModalData = useSelector(selectOrderDetails);

  const onOrderClick = () => {
    if (!isAuth) {
      return navigate('/login');
    }

    if (!constructorItems.bun || orderRequest) return;

    const orderData = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];
    dispatch(createOrder(orderData));
  };

  const closeOrderModal = () => {
    dispatch(resetOrderState());
    dispatch(resetConstructor());
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
