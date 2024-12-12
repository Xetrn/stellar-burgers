import { FC, memo, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { OrdersListProps } from './type';
import { OrdersListUI, Preloader } from '@ui';
import {
  fetchIngredients,
  selectIngredientsLoading,
  selectIngredients
} from '../../services/ingredientsSlice';
import { selectFeedLoading } from '../../services/feedsSlice';
import { selectOrderLoading } from '../../services/ordersSlice';

export const OrdersList: FC<OrdersListProps> = memo(({ orders }) => {
  const dispatch = useDispatch();
  const ingredients = useSelector(selectIngredients);

  const loadingIngredients = useSelector(selectIngredientsLoading);
  const loadingFeeds = useSelector(selectFeedLoading);
  const loadingOrders = useSelector(selectOrderLoading);
  const isLoading = loadingIngredients || loadingFeeds || loadingOrders;

  const orderByDate = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [ingredients]);

  if (isLoading) {
    return <Preloader />;
  }

  return <OrdersListUI orderByDate={orderByDate} />;
});
