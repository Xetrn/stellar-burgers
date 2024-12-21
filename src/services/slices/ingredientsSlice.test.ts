import { configureStore } from '@reduxjs/toolkit';
import {
  initialState as defaultIngredientsState,
  getIngredientsList,
  ingredientsSlice,
  selectIngredientsState,
  selectLoadingState,
  selectIngredientItems
} from './ingredientsSlice';

const createStore = () =>
  configureStore({
    reducer: {
      ingredients: ingredientsSlice.reducer
    }
  });

const mockIngredientsData = {
  ingredients: [
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
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      __v: 0
    },
    {
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
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
      __v: 0
    }
  ],
  isLoading: false,
  errorMessage: null
};

describe('Тестирование слайса ингредиентов', () => {
  test('Проверка начального состояния', () => {
    const store = createStore();
    expect(store.getState().ingredients).toEqual(defaultIngredientsState);
  });

  describe('Проверка селекторов', () => {
    test('selectIngredientItems должен возвращать список ингредиентов', () => {
      const state = { ingredients: mockIngredientsData };
      const result = selectIngredientItems(state);
      expect(result).toEqual(mockIngredientsData.ingredients);
    });

    test('selectLoadingState должен вернуть состояние загрузки', () => {
      const state = {
        ingredients: { isLoading: true, ingredients: [], errorMessage: null }
      };
      const loadingState = selectLoadingState(state);
      expect(loadingState).toBe(true);
    });

    test('selectIngredientsState должен возвращать полное состояние ингредиентов', () => {
      const state = { ingredients: mockIngredientsData };
      const fullState = selectIngredientsState(state);
      expect(fullState).toEqual(mockIngredientsData);
    });
  });

  describe('Проверка экстра-редьюсеров', () => {
    test('Проверка состояния при запросе (pending)', () => {
      const store = createStore();
      store.dispatch({ type: getIngredientsList.pending.type });
      const state = store.getState().ingredients;

      expect(state.isLoading).toBe(true);
      expect(state.errorMessage).toBeNull();
    });

    test('Проверка состояния при ошибке (rejected)', () => {
      const store = createStore();
      const errorMessage = 'Ошибка загрузки';
      store.dispatch({
        type: getIngredientsList.rejected.type,
        error: { message: errorMessage }
      });
      const state = store.getState().ingredients;

      expect(state.isLoading).toBe(true);
      expect(state.errorMessage).toBe(errorMessage);
    });

    test('Проверка состояния при успешном запросе (fulfilled)', () => {
      const store = createStore();
      store.dispatch({
        type: getIngredientsList.fulfilled.type,
        payload: mockIngredientsData.ingredients
      });
      const state = store.getState().ingredients;

      expect(state.isLoading).toBe(false);
      expect(state.ingredients).toEqual(mockIngredientsData.ingredients);
    });
  });
});
