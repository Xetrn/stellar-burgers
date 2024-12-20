import { TIngredient } from '../../utils/types';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Brioche Bun',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 30,
    calories: 150,
    price: 50,
    image: 'bun1.jpg',
    image_large: 'bun1_large.jpg',
    image_mobile: 'bun1_mobile.jpg'
  },
  {
    _id: '2',
    name: 'Beef Patty',
    type: 'main',
    proteins: 20,
    fat: 10,
    carbohydrates: 0,
    calories: 200,
    price: 100,
    image: 'patty.jpg',
    image_large: 'patty_large.jpg',
    image_mobile: 'patty_mobile.jpg'
  }
];

import {
  IngredientReducer,
  setIngredients,
  setIngredientsLoading
} from '../../services/slices/ingredients.slice';

describe('ingredientsSlice', () => {
  const initialState = {
    ingredients: [],
    isLoading: false
  };

  it('Проверка вернуть initial state', () => {
    expect(IngredientReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('Проверка setIngredients', () => {
    const newState = IngredientReducer(
      initialState,
      setIngredients(mockIngredients)
    );
    expect(newState.ingredients).toEqual(mockIngredients);
  });

  it('Проверка setIngredientsLoading (true)', () => {
    const newState = IngredientReducer(
      initialState,
      setIngredientsLoading(true)
    );
    expect(newState.isLoading).toBe(true);
  });

  it('Проверка setIngredientsLoading (false)', () => {
    const stateWithLoading = { ...initialState, isLoading: true };
    const newState = IngredientReducer(
      stateWithLoading,
      setIngredientsLoading(false)
    );
    expect(newState.isLoading).toBe(false);
  });
});
