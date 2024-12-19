import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import {
  chooseIngredient,
  selectIngredientDetails
} from '../burger-ingredients/ingredients-slice/ingredients.slice';
import { useLocation } from 'react-router-dom';
import { getLastUrlPath } from '../../utils/utils';
import { useDispatch } from 'react-redux';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const ingredientData = useSelector(selectIngredientDetails);

  useEffect(() => {
    dispatch(chooseIngredient(getLastUrlPath(location.pathname)));
  }, []);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
