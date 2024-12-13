import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { RootState } from 'src/services/store';
import { useSelector } from 'react-redux';

export const IngredientDetails: FC = () => {
  const ingredientId = useParams();
  const ingredients = useSelector(
    (state: RootState) => state.ingredients.ingredients
  );

  const ingredientData = useMemo(() => {
    if (!ingredients.length) return null;

    return ingredients.find((ingredient) => ingredient._id === ingredientId.id);
  }, [ingredients, ingredientId]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
