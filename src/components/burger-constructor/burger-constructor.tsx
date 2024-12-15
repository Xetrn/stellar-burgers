import { FC, useMemo, useState } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/services/store';
import { useNavigate } from 'react-router-dom';
import {
  closeModal,
  orderBurger
} from '../../services/slices/constructor.slice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(
    (state: RootState) => state.ConstructorReducer.constructorItems
  );
  const orderRequest = useSelector(
    (state: RootState) => state.ConstructorReducer.orderRequest
  );
  const orderModalData = useSelector(
    (state: RootState) => state.ConstructorReducer.orderModalData
  );
  const isAuth = useSelector((state: RootState) => state.UserReducer.isAuth);
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpened, setIsModalOpened] = useState(false);

  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (
      !constructorItems.bun ||
      constructorItems.ingredients.length < 1 ||
      orderRequest
    )
      return;
    if (!isAuth) {
      navigate('/login');
    }
    dispatch(
      orderBurger([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((i) => i._id)
      ])
    );
    setIsModalOpened(true);
  };
  const closeOrderModal = () => {
    dispatch(closeModal());
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
