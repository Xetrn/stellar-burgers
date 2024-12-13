import { getFeedsApi } from '@api';
import { setFeed, setFeedLoading } from '@slices';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/services/store';

export const Feed: FC = () => {
  const feeds = useSelector((state: RootState) => state.feed);
  const isLoading = useSelector((state: RootState) => state.feed.isLoading);
  const dispatch = useDispatch();

  const fetchFeed = async () => {
    dispatch(setFeedLoading(true));
    const feed = await getFeedsApi();
    dispatch(setFeed(feed));
    dispatch(setFeedLoading(false));
  };

  useEffect(() => {
    fetchFeed();
  }, [dispatch]);

  if (!feeds.orders.length || isLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={feeds.orders} handleGetFeeds={() => fetchFeed()} />;
};
