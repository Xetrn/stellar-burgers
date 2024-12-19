import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '@src/services/store';
import { useNavigate } from 'react-router-dom';
import { clearOrder, orderBurger } from '@src/services/slices/consctructor';

export const BurgerConstructor: FC = () => {
    const constructorItems = useSelector((state) => state.constructorReducer.constructorItems);
    const orderRequest = useSelector((state) => state.constructorReducer.isOrderCreating);
    const orderModalData = useSelector((state) => state.constructorReducer.order);

    const isAuth = useSelector((state) => state.userReducer.isAuth);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const onOrderClick = () => {
        if (!constructorItems.bun || constructorItems.ingredients.length < 1 || orderRequest) return;

        if (!isAuth) {
            navigate('/login');
            return;
        }

        dispatch(orderBurger([constructorItems.bun._id, ...constructorItems.ingredients.map((value) => value._id)]));
    };

    const closeOrderModal = () => dispatch(clearOrder());

    const price = useMemo(
        () =>
            (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
            constructorItems.ingredients.reduce((s: number, v: TConstructorIngredient) => s + v.price, 0),
        [constructorItems]
    );

    return (
        <BurgerConstructorUI
            price={price}
            orderRequest={orderRequest}
            constructorItems={constructorItems}
            orderModalData={orderModalData}
            onOrderClick={onOrderClick}
            closeOrderModal={closeOrderModal}
        />
    );
};
