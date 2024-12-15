import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch, useSelector } from 'react-redux';
import { addIngredient, setBun } from '../../services/slices/constructor.slice';
import { RootState } from '../../services/store';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const id = useSelector(
      (state: RootState) =>
        state.ConstructorReducer.constructorItems.ingredients.length
    );
    const handleAdd = () => {
      if (ingredient.type == 'bun') dispatch(setBun(ingredient));
      else dispatch(addIngredient({ ...ingredient, id: id.toString() }));
    };

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
