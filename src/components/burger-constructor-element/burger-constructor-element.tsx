import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { TOrderConstructor } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import {
  constructorSelector,
  deleteItem,
  updateAll
} from '../../services/slices/orderConstructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const constructorItems = useSelector(constructorSelector.selectItems);

    function swapElements(
      state: TOrderConstructor[],
      index: number,
      step: number
    ) {
      const copy = [...state];
      copy[index] = copy.splice(index + step, 1, copy[index])[0];
      return copy;
    }

    const handleMoveDown = () => {
      dispatch(updateAll(swapElements(constructorItems.ingredients, index, 1)));
    };

    const handleMoveUp = () => {
      dispatch(
        updateAll(swapElements(constructorItems.ingredients, index, -1))
      );
    };

    const handleClose = () => {
      dispatch(deleteItem(ingredient));
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
