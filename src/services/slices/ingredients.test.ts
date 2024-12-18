import { configureStore } from '@reduxjs/toolkit';
import { fetchIngredientsAction, ingredientsReducer } from './ingredientsSlice';

describe('ingredientsSlice', () => {
  const initialState = {
    ingredients: [],
    ingredientsModalData: null,
    error: null,
    isLoading: false
  };

  const expectedPendingState = {
    ...initialState,
    isLoading: true
  };

  const mockIngredients = [
    {
      _id: '60d3b41abdacab0026a733c6',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 85,
      fat: 28,
      carbohydrates: 48,
      calories: 380,
      price: 1299,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchIngredientsAction', () => {
    it('должен обрабатывать загрузку ингредиентов', () => {
      const store = configureStore({
        reducer: { ingredients: ingredientsReducer }
      });

      store.dispatch(fetchIngredientsAction());
      const state = store.getState().ingredients;
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('должен получать ингредиенты', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            data: mockIngredients
          })
      });

      const store = configureStore({
        reducer: { ingredients: ingredientsReducer }
      });

      await store.dispatch(fetchIngredientsAction());
      const state = store.getState().ingredients;

      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.ingredients).toEqual(mockIngredients);
    });

    it('должен обрабатывать ошибку получения ингредиентов', async () => {
      const errorMessage = 'Failed to fetch';
      global.fetch = jest.fn().mockRejectedValue(new Error(errorMessage));

      const store = configureStore({
        reducer: { ingredients: ingredientsReducer }
      });

      await store.dispatch(fetchIngredientsAction());
      const state = store.getState().ingredients;

      expect(state.isLoading).toBe(false);
      expect(state.ingredients).toEqual([]);
      expect(state.error).toBe(errorMessage);
    });
  });
});
