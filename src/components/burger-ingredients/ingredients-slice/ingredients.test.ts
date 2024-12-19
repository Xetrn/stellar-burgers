import Reducer, {
  chooseIngredient,
  selectIngredientDetails
} from './ingredients.slice';

import { configureStore } from '@reduxjs/toolkit';
import { server } from '../../../../mocs/node';
import { getIngredients } from './getIngredients';
import ingredientsMock from '../../../../cypress/fixtures/ingredients.json';

describe('Тесты слайса ингредиентов', () => {
  let store = configureStore({
    reducer: {
      ingredientsSlice: Reducer
    }
  });

  beforeAll(() => server.listen());
  afterEach(
    () =>
      (store = configureStore({
        reducer: {
          ingredientsSlice: Reducer
        }
      }))
  );
  afterAll(() => server.close());

  describe('Тесты на состояния загрузок и загрузку данных', () => {
    test('должен установить isLoading на true при pending', async () => {
      store.dispatch(getIngredients.pending('getIngredients'));
      const { loading, error } = store.getState().ingredientsSlice;

      expect(loading).toBe(true);
      expect(error).toBe(null);
    });

    test('должен сохранить данные и установить isLoading на false при fulfilled', async () => {
      store.dispatch(
        getIngredients.fulfilled(ingredientsMock.data, 'getIngredients')
      );

      const { loading, error, all } = store.getState().ingredientsSlice;

      expect(loading).toBe(false);
      expect(ingredientsMock.data).toEqual(all);
      expect(error).toBe(null);
    });

    test('должен сохранить ошибку и установить isLoading на false при rejected', async () => {
      const errorMock = 'Ошибка при получении ленты заказов';

      store.dispatch(
        getIngredients.rejected(new Error(errorMock), 'getIngredients')
      );

      const { loading, error } = store.getState().ingredientsSlice;

      expect(loading).toBe(false);
      expect(error).toBe(errorMock);
    });

    test('корректно собираются данные ингредиентов', async () => {
      const result = await store.dispatch(getIngredients());
      expect(result.type).toBe('ingredientsSlice/getAllIngredients/fulfilled');

      const { all, mains, buns, sauces } = store.getState().ingredientsSlice;

      expect(all).toEqual(ingredientsMock.data);
      expect(mains).toEqual(all.filter((item) => item.type === 'main'));
      expect(buns).toEqual(all.filter((item) => item.type === 'bun'));
      expect(sauces).toEqual(all.filter((item) => item.type === 'sauce'));
    });
  });

  describe('тесты функционала selectors actions', () => {
    test('выбор ингредиента работает корректно', async () => {
      await store.dispatch(getIngredients());
      store.dispatch(chooseIngredient('0'));
      const chosen = selectIngredientDetails(store.getState());
      expect(chosen).toEqual(
        ingredientsMock.data.find((item) => item._id === '0')
      );
    });
  });
});
