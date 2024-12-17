import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../../src/services/store';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const ingredients = useSelector(state => state.ingredientsReducer.ingredients);
  const ingredientData = useMemo(() => ingredients.find(i => i._id === id)
  , [id, ingredients]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
