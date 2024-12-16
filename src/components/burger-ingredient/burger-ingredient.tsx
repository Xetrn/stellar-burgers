import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useAppDispatch } from '../../services/store';
import { setConstructorBun, setConstructorIngredients } from '@slices';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useAppDispatch();

    const handleAdd = () => {
      switch (ingredient.type) {
        case 'bun': {
          dispatch(setConstructorBun(ingredient));
          break;
        }
        default: {
          dispatch(
            setConstructorIngredients({ ...ingredient, id: ingredient._id })
          );
          break;
        }
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
  }
);
