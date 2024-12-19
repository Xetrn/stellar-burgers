import { FC, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';

import { Preloader } from '@src/components/ui/preloader';
import { OrderInfoUI } from '@src/components/ui/order-info';
import { useSelector } from '@src/services/store';

export const OrderInfo: FC = () => {
    const { number } = useParams();

    const feedsOrders = useSelector((state) => state.feedsReducer.orders);
    const ordersOrders = useSelector((state) => state.ordersReducer.orders);

    const orders = [...feedsOrders, ...ordersOrders];

    const orderData = orders.find((value) => value.number === Number(number));

    const ingredients = useSelector((state) => state.ingredientsReducer.ingredients);

    const orderInfo = useMemo(() => {
        if (!orderData || !ingredients.length) return null;

        const date = new Date(orderData.createdAt);

        type TIngredientsWithCount = {
            [key: string]: TIngredient & { count: number };
        };

        const ingredientsInfo = orderData.ingredients.reduce((acc: TIngredientsWithCount, item) => {
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
        }, {});

        const total = Object.values(ingredientsInfo).reduce((acc, item) => acc + item.price * item.count, 0);

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
