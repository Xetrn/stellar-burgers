import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectLoading, selectOrders } from './feed-slice/feed-slice';
import { selectLoading as isIngredientsLoading } from '../../components/burger-ingredients/ingredients-slice/ingredients.slice';
import { getIngredients } from '../../components/burger-ingredients/ingredients-slice/getIngredients';
import { getFeed } from './feed-slice/actions';
import { selectAllIngredients } from '../../components/burger-ingredients/ingredients-slice/ingredients.slice';

export const Feed: FC = () => {
  const orders = useSelector(selectOrders);
  const isLoading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const ingredients = useSelector(selectAllIngredients);
  const ingredientsLoading = useSelector(isIngredientsLoading);

  useEffect(() => {
    if (!isLoading) {
      dispatch(getFeed());
    }
    if (!ingredients.length && !ingredientsLoading) {
      dispatch(getIngredients());
    }
  }, []);

  if (isLoading || ingredientsLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeed());
      }}
    />
  );
};
