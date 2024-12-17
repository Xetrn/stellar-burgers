import { FC, useMemo, useState } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../../src/services/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { orderBurger } from '../../../src/services/thunks';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const constructorItems = useSelector(state => state.constructorReducer.constructorItems);
  const orderRequest = useSelector(state => state.constructorReducer.isOrderRequest);
  const orderModalData = useSelector(state => state.constructorReducer.orderData);
  const isAuthenthicated = useSelector(state => state.userReducer.isAuthenthicated);

  const [isModalOpened, setIsModalOpened] = useState(false);

  const onOrderClick = () => {
    if (!constructorItems.bun || constructorItems.ingredients.length < 1 || orderRequest) return;
    if (!isAuthenthicated) {
      navigate("/login", {state: {from: location}})
    }
    dispatch(orderBurger([constructorItems.bun._id, ...constructorItems.ingredients.map(i => i._id)]));
    setIsModalOpened(true);
  };
  const closeOrderModal = () => setIsModalOpened(false);

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
      isModalOpened={isModalOpened}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
