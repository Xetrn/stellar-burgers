import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch, useSelector } from '@src/services/store';
import { addIngredient, setBun } from '@src/services/slices/consctructor';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(({ ingredient, count }) => {
    const location = useLocation();

    const ingredientId = useSelector((state) => state.constructorReducer.ingredientId);

    const dispatch = useDispatch();

    const handleAdd = () => {
        if (ingredient.type === 'bun') {
            dispatch(setBun(ingredient));
        } else {
            dispatch(addIngredient({ ...ingredient, id: ingredientId.toString() }));
        }
    };

    return (
        <BurgerIngredientUI
            ingredient={ingredient}
            count={count}
            locationState={{ background: location }}
            handleAdd={handleAdd}
        />
    );
});
