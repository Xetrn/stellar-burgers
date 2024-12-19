import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchFeed,
  selectFeed,
  selectIsLoading
} from '../../services/slices/feed-slice/feed-slice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectIsLoading);
  const feed = useSelector(selectFeed);

  useEffect(() => {
    if (!feed.orders.length) {
      dispatch(fetchFeed());
    }
  }, [dispatch]);

  if (!feed.orders.length || loading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={feed.orders}
      handleGetFeeds={() => {
        dispatch(fetchFeed);
      }}
    />
  );
};
