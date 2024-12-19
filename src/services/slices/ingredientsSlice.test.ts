import { expect, describe, test } from '@jest/globals';
import { ingredientsSlice, getIngredientsList } from '../slices/ingredientsSlice';

const testBun = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

const testIngredient = {
  _id: '643d69a5c3f7b9001cfa093e',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
};

const testSauce = {
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
};

const mockIngredients = [testBun, testIngredient, testSauce];

const initialState = {
  ingredients: [],
  loading: false,
  error: null
};

describe('Тесты для ingredientsSlice', () => {
  const ingredientsReducer = ingredientsSlice.reducer;

  test('Инициализация: состояние по умолчанию', () => {
    const state = ingredientsReducer(undefined, { type: '@INIT' });
    expect(state).toEqual(initialState);
  });

  test('getIngredientsList.pending изменяет loading на true', () => {
    const action = { type: getIngredientsList.pending.type };
    const state = ingredientsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null
    });
  });

  test('getIngredientsList.fulfilled обновляет ингредиенты и сбрасывает loading', () => {
    const action = { type: getIngredientsList.fulfilled.type, payload: mockIngredients };
    const state = ingredientsReducer(initialState, action);
    expect(state).toEqual({
      ingredients: mockIngredients,
      loading: false,
      error: null
    });
  });

  test('getIngredientsList.rejected устанавливает ошибку', () => {
    const action = {
      type: getIngredientsList.rejected.type,
      error: { message: 'Ошибка загрузки ингредиентов' }
    };
    const state = ingredientsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: 'Ошибка загрузки ингредиентов'
    });
  });

  test('getIngredientsState возвращает состояние ингредиентов', () => {
    const state = {
      ingredients: {
        ingredients: mockIngredients,
        loading: false,
        error: null
      }
    };
    expect(ingredientsSlice.selectors.getIngredientsState(state)).toEqual(state.ingredients);
  });

  test('getIngredientsLoadingState возвращает состояние загрузки', () => {
    const state = {
      ingredients: {
        ingredients: mockIngredients,
        loading: true,
        error: null
      }
    };
    expect(ingredientsSlice.selectors.getIngredientsLoadingState(state)).toEqual(true);
  });

  test('getIngredients возвращает список ингредиентов', () => {
    const state = {
      ingredients: {
        ingredients: mockIngredients,
        loading: false,
        error: null
      }
    };
    expect(ingredientsSlice.selectors.getIngredients(state)).toEqual(mockIngredients);
  });
});
