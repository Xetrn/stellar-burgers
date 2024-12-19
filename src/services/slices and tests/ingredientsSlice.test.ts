import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer, {
  fetchIngredients,
  getIngredients,
  getIngredientsLoading
} from './ingredientsSlice';

const createTestStore = () =>
  configureStore({
    reducer: {
      ingredients: ingredientsReducer
    }
  });

const mockIngredientsData = [
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
];

describe('ingredientsSlice', () => {
  test('initialState', () => {
    const store = createTestStore();
    const state = store.getState().ingredients;
    expect(state.ingredients).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  describe('selectors', () => {
    const state = {
      ingredients: {
        ingredients: mockIngredientsData,
        loading: true,
        error: null
      }
    };

    test('getIngredients selector', () => {
      const selectedIngredients = getIngredients({
        ingredients: state.ingredients
      });
      expect(selectedIngredients).toEqual(mockIngredientsData);
    });

    test('getIngredientsLoading selector', () => {
      const loading = getIngredientsLoading({ ingredients: state.ingredients });
      expect(loading).toBe(true);
    });
  });

  describe('extraReducers', () => {
    test('pending', () => {
      const store = createTestStore();
      store.dispatch({ type: fetchIngredients.pending.type });

      const state = store.getState().ingredients;
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    test('fulfilled', () => {
      const store = createTestStore();
      store.dispatch({
        type: fetchIngredients.fulfilled.type,
        payload: mockIngredientsData
      });

      const state = store.getState().ingredients;
      expect(state.loading).toBe(false);
      expect(state.ingredients).toEqual(mockIngredientsData);
    });

    test('rejected', () => {
      const store = createTestStore();
      const errorMessage = 'Failed to fetch ingredients';
      store.dispatch({
        type: fetchIngredients.rejected.type,
        error: { message: errorMessage }
      });

      const state = store.getState().ingredients;
      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.ingredients).toEqual([]);
    });
  });
});
