import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { AppDispatch, RootState } from '../../services/store';
import { useDispatch, useSelector } from 'react-redux';
import { clearOrder, createOrder } from '../../services/slices/orderSlice';
import { fetchFeeds } from '../../services/slices/feedsSlice';
import { clearConstructor } from '../../services/slices/constructorSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const constructorItems = useSelector(
    (state: RootState) => state.burgerConstructor
  );
  const orderRequest = useSelector(
    (state: RootState) => state.order.orderRequest
  );
  const orderModalData = useSelector(
    (state: RootState) => state.order.orderModalData
  );
  const feeds = useSelector((state: RootState) => state.orders.feeds);

  useEffect(() => {
    if (!feeds.orders.length) {
      dispatch(fetchFeeds());
    }
  }, []);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user.isAuthenticated) {
      navigate('/login', { state: { from: location } });
      return;
    }

    const ingredients = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];

    dispatch(createOrder(ingredients));
  };
  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      (constructorItems.ingredients
        ? constructorItems.ingredients.reduce(
            (s: number, v: TConstructorIngredient) => s + v.price,
            0
          )
        : 0),
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
