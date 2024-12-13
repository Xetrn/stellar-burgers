import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { RootState, useAppDispatch } from '../../services/store';
import {
  deleteConstructorIngredient,
  setConstructorIngredients,
  updateConstructorIngredients
} from '@slices';
import { useSelector } from 'react-redux';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useAppDispatch();
    const ingredients = useSelector(
      (state: RootState) =>
        state.ConstructorReducer.constructorItems.ingredients
    );
    const handleMoveDown = () => {
      if (index < ingredients.length - 1) {
        const updatedIngredients: TConstructorIngredient[] = [...ingredients];
        [updatedIngredients[index], updatedIngredients[index + 1]] = [
          updatedIngredients[index + 1],
          updatedIngredients[index]
        ];
        dispatch(updateConstructorIngredients(updatedIngredients));
      }
    };

    const handleMoveUp = () => {
      if (index > 0) {
        const updatedIngredients: TConstructorIngredient[] = [...ingredients];
        [updatedIngredients[index], updatedIngredients[index - 1]] = [
          updatedIngredients[index - 1],
          updatedIngredients[index]
        ];
        dispatch(updateConstructorIngredients(updatedIngredients));
      }
    };

    const handleClose = () => {
      dispatch(deleteConstructorIngredient(ingredient));
    };

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
