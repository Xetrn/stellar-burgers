import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import {
  selectIngredients,
  selectIsLoading
} from '../../services/slices/ingredients-slice/ingredients-slice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const loading = useSelector(selectIsLoading);
  const ingredients = useSelector(selectIngredients);
  const id = useParams().id;
  const ingredientData = ingredients.find((i) => i._id === id);

  if (loading) {
    return <Preloader />;
  }

  if (!ingredientData) return;

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
