import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getIngredients } from '../../services/slices and tests/ingredientsSlice';

export const IngredientDetails: FC = () => {
  const ingredients = useSelector(getIngredients);
  const params = useParams();
  const ingredientData = ingredients.find(
    (element) => element._id === params.id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
