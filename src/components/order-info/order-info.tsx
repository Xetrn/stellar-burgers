import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { selectOrder } from './order-info-slice/order-modal-slice';
import { useDispatch, useSelector } from '../../services/store';
import { selectAllIngredients } from '../burger-ingredients/ingredients-slice/ingredients.slice';
import { getOrderById } from './order-info-slice/getFeedById';
import { useLocation } from 'react-router-dom';
import { getLastUrlPath } from '../../utils/utils';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const orderData = useSelector(selectOrder);
  const ingredients = useSelector(selectAllIngredients);
  const location = useLocation();

  useEffect(() => {
    dispatch(getOrderById(Number(getLastUrlPath(location.pathname))));
  }, []);

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

  if (!orderInfo?._id) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
