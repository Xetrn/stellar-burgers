import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../services/store';
import { clearConstructor, setOrderModalData, setOrderRequest } from '@slices';
import { useNavigate } from 'react-router-dom';
import { orderBurgerApi } from '@api';

export const BurgerConstructor: FC = () => {
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(
    (state: RootState) => state.ConstructorReducer.constructorItems
  );

  const orderRequest = useSelector(
    (state: RootState) => state.ConstructorReducer.orderRequest
  );

  const orderModalData = useSelector(
    (state: RootState) => state.ConstructorReducer.orderModalData
  );

  const onClose = () => {
    dispatch(setOrderRequest(false));
    dispatch(clearConstructor());
    navigate('/');
  };

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuth) {
      navigate('/login');
    }

    const orderData = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item.id)
    ];

    const order = orderBurgerApi(orderData);
    order
      .then((data) => {
        console.log(data);
        dispatch(setOrderModalData(data.order));
      })
      .catch((err) => alert(err));
    dispatch(setOrderRequest(true));
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
      onClose={onClose}
    />
  );
};
