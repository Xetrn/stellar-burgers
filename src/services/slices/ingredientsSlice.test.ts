import { configureStore } from '@reduxjs/toolkit';
import {
  getIngredientsList,
  ingredientsSelector,
  ingredientsSliceReducer,
  ingredientsStateSelector,
  initialState,
  isLoadingSelector
} from './ingredientsSlice';

const createTestStore = () =>
  configureStore({
    reducer: {
      ingredients: ingredientsSliceReducer
    }
  });

const ingredientsData = {
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
  loading: false,
  error: null
};

describe('ingredients slice', () => {
  test('initial state', () => {
    const store = createTestStore();
    
    expect(store.getState().ingredients).toEqual(initialState);
  });

  describe('selectors', () => {
    test('ingredientsSelector should return the list of ingredients', () => {
      const state = {
        ingredients: ingredientsData
      };
      const selectedIngredients = ingredientsSelector(state);

      expect(selectedIngredients).toEqual(ingredientsData.ingredients);
    });

    test('isLoadingSelector should return true when loading', () => {
      const state = {
        ingredients: {
          loading: true,
          ingredients: [],
          error: null
        }
      };
      const isLoading = isLoadingSelector(state);

      expect(isLoading).toBe(true);
    });

    test('ingredientsStateSelector should return the full ingredients state', () => {
      const state = {
        ingredients: ingredientsData
      };
      const selectedState = ingredientsStateSelector(state);

      expect(selectedState).toEqual(ingredientsData);
    });
  });

  describe('extra reducers', () => {
    test('handle pending state', () => {
      const store = createTestStore();
      store.dispatch({ type: getIngredientsList.pending.type });
      const state = store.getState().ingredients;

      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    test('handle rejected state', () => {
      const store = createTestStore();
      const errorMessage = 'error';
      store.dispatch({
        type: getIngredientsList.rejected.type,
        error: { message: errorMessage }
      });
      const state = store.getState().ingredients;

      expect(state.loading).toBe(true);
      expect(state.error).toBe(errorMessage);
    });

    test('handle fulfilled state', () => {
      const store = createTestStore();
      store.dispatch({
        type: getIngredientsList.fulfilled.type,
        payload: ingredientsData.ingredients
      });
      const state = store.getState().ingredients;

      expect(state.loading).toBe(false);
      expect(state.ingredients).toEqual(ingredientsData.ingredients);
    });
  });
});
