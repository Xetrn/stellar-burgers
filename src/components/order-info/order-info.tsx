import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector } from 'react-redux';
import { RootState } from 'src/services/store';
import { AppDispatch } from 'src/services/store';
import { useDispatch } from 'react-redux';
import { fetchOrderByNumber } from '../../services/slices/orderSlice';
import { clearOrder } from '../../services/slices/orderSlice';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const number = location.pathname.split('/')[2];
  const dispatch: AppDispatch = useDispatch();
  const orderData = useSelector(
    (state: RootState) => state.order.orderModalData
  );
  const allIngredients = useSelector(
    (state: RootState) => state.ingredients.ingredients
  );

  useEffect(() => {
    dispatch(fetchOrderByNumber(Number(number)));
    if (!allIngredients.length) {
      dispatch(fetchIngredients());
    }
    return () => {
      dispatch(clearOrder());
    };
  }, [dispatch, number]);

  const ingredients: TIngredient[] = orderData?.ingredients.map((id) =>
    allIngredients.find((ingredient) => ingredient._id === id)
  ) as TIngredient[];

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
