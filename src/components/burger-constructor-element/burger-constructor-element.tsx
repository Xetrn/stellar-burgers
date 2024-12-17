import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../../src/services/store';
import { removeIngredient, swapWithAbove, swapWithBelow } from '../../../src/services/slices/constructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {

    const dispatch = useDispatch();

    const handleMoveDown = () => dispatch(swapWithBelow(index));

    const handleMoveUp = () => dispatch(swapWithAbove(index));

    const handleClose = () => dispatch(removeIngredient(ingredient))

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
  }
);
