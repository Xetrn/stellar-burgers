import { expect, test, describe } from '@jest/globals';
import { rootReducer } from '../src/services/store';
import { initialState as userInitialState } from '../src/services/userSlice';
import { initialState as feedsInitialState } from '../src/services/feedsSlice';
import { initialState as ingredientsInitialState } from '../src/services/ingredientsSlice';
import { initialState as ordersInitialState } from '../src/services/ordersSlice';
import { initialState as builderInitialState } from '../src/services/builderSlice';

const expectedState = {
  user: userInitialState,
  feeds: feedsInitialState,
  ingredients: ingredientsInitialState,
  orders: ordersInitialState,
  builder: builderInitialState
};

describe('Проверка корректности работы rootReducer', () => {
  test('Инициализация состояния rootReducer', () => {
    const state = rootReducer(undefined, { type: 'unknown' });
    expect(state).toStrictEqual(expectedState);
  });
});
