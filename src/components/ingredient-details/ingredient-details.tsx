import { FC } from 'react';
import { IngredientDetailsUI, Preloader } from '@ui';
import { useSelector } from '../../services/store';
import { getIngredientsState } from '../../services/slices/ingredients';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const { ingredients } = useSelector(getIngredientsState);

  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
