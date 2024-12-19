import { expect, test } from '@jest/globals';
import {
  getIngredientsList,
  ingredientsSlice,
  initialState,
  TIngredientsState
} from '../slices/ingredients';
import { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  }
];

describe('Check get ingredients api', () => {
  test('getIngredientsList.pending', () => {
    const action = { type: getIngredientsList.pending.type };
    const newState = ingredientsSlice.reducer(initialState, action);

    const expectedState: TIngredientsState = {
      ...initialState,
      isLoadingGetIngredients: true,
      error: null
    };

    expect(newState).toEqual(expectedState);
  });

  test('getIngredientsList.fulfilled', () => {
    const action = {
      type: getIngredientsList.fulfilled.type,
      payload: mockIngredients
    };
    const newState = ingredientsSlice.reducer(initialState, action);

    const expectedState: TIngredientsState = {
      ...initialState,
      isLoadingGetIngredients: false,
      ingredients: mockIngredients,
      error: null
    };

    expect(newState).toEqual(expectedState);
  });

  test('getIngredientsList.rejected', () => {
    const action = {
      type: getIngredientsList.rejected.type,
      error: { message: 'Ошибка загрузки ингредиентов' }
    };
    const newState = ingredientsSlice.reducer(initialState, action);

    const expectedState: TIngredientsState = {
      ...initialState,
      isLoadingGetIngredients: false,
      error: 'Ошибка загрузки ингредиентов'
    };

    expect(newState).toEqual(expectedState);
  });
});
