import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch, useSelector } from '../../../src/services/store';
import { addIngredient, setBun } from '../../../src/services/slices/constructorSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const ingredientId = useSelector(state => state.constructorReducer.ingredientId);
    const handleAdd = () => {
      switch (ingredient.type) {
        case "bun":
          dispatch(setBun(ingredient));
          break;
        default:
          dispatch(addIngredient({...ingredient, id: ingredientId.toString()}))
          break;
      }
    }

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
