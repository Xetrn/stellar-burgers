import { expect, test } from '@jest/globals';
import { rootReducer } from '../reducers/root-reducer';
import { store } from '../store';

describe('Проверка корректности работы root-reducer', () => {
  // Выполняем редьюсер с неизвестным действием и проверяем его состояние
  const testState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

  test('Проверка состояния по умолчанию', () => {
    // Ожидаем, что состояние редьюсера совпадает с состоянием хранилища
    expect(testState).toEqual(store.getState());
  });
});
