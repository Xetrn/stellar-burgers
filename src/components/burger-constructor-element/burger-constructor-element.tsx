import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import {
  deleteIngredientById,
  getConstructor,
  moveIngredientDown,
  moveIngredientUp
} from '@slices';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(moveIngredientDown(ingredient.id));
    };

    const handleMoveUp = () => {
      dispatch(moveIngredientUp(ingredient.id));
    };

    const handleDelete = () => {
      dispatch(deleteIngredientById(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleDelete}
      />
    );
  }
);
