import { expect, test } from '@jest/globals';
import rootReducer from './rootReducer';
import store from './store';

describe('Проверка корректности работы root-reducer', () => {
  const testState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

  test('Проверка состояния по умолчанию', () => {
    expect(testState).toEqual(store.getState());
  });
});
