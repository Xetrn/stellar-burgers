import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeed } from './feed-slice/getFeed';
import { selectLoading, selectOrders } from './feed-slice/feed-slice';
import { getIngredients } from '../../components/burger-ingredients/ingredients-slice/getIngredients';

export const Feed: FC = () => {
  const orders = useSelector(selectOrders);
  const isLoading = useSelector(selectLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeed());
    dispatch(getIngredients());
  }, []);
  if (isLoading) {
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
