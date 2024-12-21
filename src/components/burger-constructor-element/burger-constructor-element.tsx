import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import {
  constructorSelector,
  updateConstructor,
  removeIngredient
} from '../../services/slices/orderConstructorSlice';
import { TConstructorIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const constructorItems = useSelector(constructorSelector.selectItems);

    function swapElement(
      state: TConstructorIngredient[],
      index: number,
      step: number
    ) {
      const copy = [...state];
      copy[index] = copy.splice(index + step, 1, copy[index])[0];
      return copy;
    }

    const handleMoveDown = () => {
      dispatch(
        updateConstructor(swapElement(constructorItems.ingredients, index, 1))
      );
    };

    const handleMoveUp = () => {
      dispatch(
        updateConstructor(swapElement(constructorItems.ingredients, index, -1))
      );
    };

    const handleClose = () => {
      dispatch(removeIngredient(ingredient));
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
