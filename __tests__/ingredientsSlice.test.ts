import { expect, test, describe } from '@jest/globals';
import {
  initialState,
  fetchIngredients,
  ingredientsSlice
} from '../src/services/ingredientsSlice';
import {
  ingredientBun,
  ingredientMain,
  ingredientSauce,
  requestId,
  errorMessage
} from './mocks';
import { TIngredient } from '../src/utils/types';

describe('Тесты проверяющие работу ingredientsReducer', () => {
  test('Проверка начального состояния', () => {
    const state = ingredientsSlice.reducer(undefined, { type: 'unknown' });
    expect(state).toStrictEqual(initialState);
  });

  describe('Тестирование асинхронного экшена: fetchIngredients', () => {
    test('Обработка состояния загрузки', () => {
      const action = fetchIngredients.pending(requestId);
      const state = ingredientsSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(true);
    });

    test('Обработка успешного запроса', () => {
      const payload: TIngredient[] = [
        ingredientBun,
        ingredientMain,
        ingredientSauce
      ];
      const action = fetchIngredients.fulfilled(payload, requestId);
      const state = ingredientsSlice.reducer(initialState, action);
      expect(state.items).toStrictEqual(payload);
      expect(state.isLoading).toBe(false);
    });

    test('Обработка ошибки запроса', () => {
      const action = fetchIngredients.rejected(
        new Error(errorMessage),
        requestId,
        undefined
      );
      const state = ingredientsSlice.reducer(initialState, action);
      expect(state.isLoading).toBe(false);
    });
  });
});
