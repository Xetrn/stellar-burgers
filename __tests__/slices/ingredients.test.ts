import { configureStore } from '@reduxjs/toolkit';
import {
  fetchIngredients,
  getBunsIngredients,
  getIngredientById,
  getIngredients,
  getIngredientsError,
  getIngredientsLoading,
  getMainsIngredients,
  getSaucesIngredients,
  ingredientsSlice
} from '../../src/services/slices';

import {
  error,
  ingredientsState,
  initialIngredientsState,
  mockIngredients
} from '../../mocks/ingredients';

describe('Слайс ингредиентов работает', () => {
  it('Конструктор инициализирован правильно', () => {
    const initialState = ingredientsSlice.reducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });
    expect(initialState).toEqual(initialIngredientsState);
  });

  describe('Запрос ингредиентов работает', () => {
    const store = configureStore({
      reducer: {
        [ingredientsSlice.name]: ingredientsSlice.reducer
      }
    });

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('Состояние загрузки обрабатывается корректно', () => {
      const state = ingredientsSlice.reducer(initialIngredientsState, {
        type: fetchIngredients.pending.type
      });
      expect(state.loading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    it('Данные с сервера обрабатываются корректно', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            data: mockIngredients
          })
      });

      await store.dispatch(fetchIngredients());
      const state = store.getState().ingredients;
      expect(state.loading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.ingredients).toEqual(mockIngredients);
    });

    it('Ошибка запроса обрабатывается корректно', async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error(error));

      await store.dispatch(fetchIngredients());
      const state = store.getState().ingredients;

      expect(state.loading).toBeFalsy();
      expect(state.error).toBe(error);
    });
  });

  describe('Селекторы работают', () => {
    const state = {
      [ingredientsSlice.name]: ingredientsSlice.reducer(ingredientsState, {
        type: 'UNKNOWN_ACTION'
      })
    };

    it('Селектор getIngredients работает корректно', () => {
      expect(getIngredients(state)).toEqual(mockIngredients);
    });

    it('Селектор getIngredientsLoading работает корректно', () => {
      expect(getIngredientsLoading(state)).toBeFalsy();
    });

    it('Селектор getIngredientsError работает корректно', () => {
      expect(getIngredientsError(state)).toBeNull();
    });

    it('Селектор getBunsIngredients работает корректно', () => {
      expect(getBunsIngredients(state)).toEqual(
        mockIngredients.filter((i) => i.type === 'bun')
      );
    });

    it('Селектор getMainsIngredients работает корректно', () => {
      expect(getMainsIngredients(state)).toEqual(
        mockIngredients.filter((i) => i.type === 'main')
      );
    });

    it('Селектор getSaucesIngredients работает корректно', () => {
      expect(getSaucesIngredients(state)).toEqual(
        mockIngredients.filter((i) => i.type === 'sauce')
      );
    });

    it('Селектор getIngredientById работает корректно', () => {
      const id = '643d69a5c3f7b9001cfa0941';
      expect(getIngredientById(id)(state)).toEqual(
        mockIngredients.find((i) => i._id === id)
      );
    });
  });
});
