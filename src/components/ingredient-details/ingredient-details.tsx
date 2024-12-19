import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/services/store';
import { useLocation } from 'react-router-dom';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  /** TODO: взять переменную из стора */
  const id = useLocation().pathname.split('/')[2];
  const ingredientData = useSelector((state: RootState) =>
    state.ingredients.ingredients.find((ingredient) => ingredient._id === id)
  );
  useEffect(() => {
    if (!ingredientData) {
      dispatch(fetchIngredients());
    }
  }, [ingredientData]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
