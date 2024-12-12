import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import swapElements from '../../utils/swap-elements';
import {
  deleteItemFromConstructor,
  getConstructorItems,
  updateConstructor
} from '../../services/slices/constructor';
import { useDispatch, useSelector } from '../../services/store';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const constructorItems = useSelector(getConstructorItems);

    const handleMoveDown = () => {
      dispatch(
        updateConstructor(swapElements(constructorItems.ingredients, index, 1))
      );
    };

    const handleMoveUp = () => {
      dispatch(
        updateConstructor(swapElements(constructorItems.ingredients, index, -1))
      );
    };

    const handleClose = () => {
      dispatch(deleteItemFromConstructor(ingredient));
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
