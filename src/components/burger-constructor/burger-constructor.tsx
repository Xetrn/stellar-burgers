import { FC, useMemo, useState } from 'react';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../services/slices/user-slice';
import {
  getBurgerConstructorState,
  selectIsLoading,
  sendOrder
} from '../../services/slices/burger-constructor-slice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const constructorItems = useSelector(getBurgerConstructorState);

  const orderRequest = useSelector(selectIsLoading);

  const [orderModalData, setOrderModalData] = useState<TOrder | null>(null);

  const onOrderClick = () => {
    if (!constructorItems.constructorItems.bun || orderRequest) return;
    if (!user) return navigate('/login');

    const ingredients = [
      constructorItems.constructorItems.bun?._id,
      ...constructorItems.constructorItems.ingredients.map((item) => item._id)
    ];
    dispatch(sendOrder(ingredients))
      .unwrap()
      .then((response) => {
        const newOrder = response.order;
        setOrderModalData(newOrder);
      })
      .catch((err) => {
        console.log('Ошибка при оформлении заказа:', err);
      });
  };
  const closeOrderModal = () => {
    setOrderModalData(null);
  };

  const price = useMemo(
    () =>
      (constructorItems.constructorItems.bun
        ? constructorItems.constructorItems.bun.price * 2
        : 0) +
      constructorItems.constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  //return null;

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
