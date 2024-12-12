import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectIngredientById,
  fetchIngredients
} from '../../services/ingredientsSlice';
import { useDispatch } from '../../services/store';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const ingredientData = useSelector(selectIngredientById(id as string));

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
