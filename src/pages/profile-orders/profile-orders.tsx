import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '@src/services/store';
import { getOrders } from '@src/services/slices/orders';
import { getIngredients } from '@src/services/slices/ingredients';
import { getFeeds } from '@src/services/slices/feed';

export const ProfileOrders: FC = () => {
    const orders: TOrder[] = useSelector((state) => state.ordersReducer.orders);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFeeds());
        dispatch(getOrders());
        dispatch(getIngredients());
    }, []);

    return <ProfileOrdersUI orders={orders} />;
};
