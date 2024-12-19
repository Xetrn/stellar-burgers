import { FC, memo } from 'react';

import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '@src/services/store';
import { removeIngredient, moveUp, moveDown } from '@src/services/slices/consctructor';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => dispatch(moveDown(index));
    const handleMoveUp = () => dispatch(moveUp(index));
    const handleClose = () => dispatch(removeIngredient(ingredient));

    return (
        <BurgerConstructorElementUI
            ingredient={ingredient}
            index={index}
            totalItems={totalItems}
            handleMoveUp={handleMoveUp}
            handleMoveDown={handleMoveDown}
            handleClose={handleClose}
        />
    );
});
