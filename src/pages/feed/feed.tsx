import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '@src/services/store';
import { getFeeds } from '@src/services/slices/feed';
import { getIngredients } from '@src/services/slices/ingredients';

export const Feed: FC = () => {
    const orders: TOrder[] = useSelector((state) => state.feedsReducer.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients());
        dispatch(getFeeds());
    }, []);

    if (!orders.length) {
        return <Preloader />;
    }

    return (
        <FeedUI
            orders={orders}
            handleGetFeeds={() => {
                dispatch(getFeeds());
            }}
        />
    );
};
