jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mocked-id')
}));

import reducer, {
  initialState,
  addIngredient,
  removeIngredient,
  clearIngredients
} from './constructorSlice';
import { IConstructorState } from './constructorSlice';

// Пример данных для тестов
const bunData = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

const ingredientData = {
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
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

describe('constructorSlice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  it('should handle adding a bun', () => {
    const action = addIngredient(bunData);
    const state = reducer(initialState, action);

    // Обновляем ожидание с новым id
    expect(state.bun).toEqual({ ...bunData, id: 'mocked-id' });
    expect(state.ingredients).toEqual([]);
  });

  it('should handle adding an ingredient', () => {
    const action = addIngredient(ingredientData);
    const state = reducer(initialState, action);

    // Проверяем длину массива и корректность данных с новым id
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual({
      ...ingredientData,
      id: 'mocked-id'
    });
  });

  it('should handle removing an ingredient', () => {
    const stateWithIngredients: IConstructorState = {
      bun: null,
      ingredients: [{ ...ingredientData, id: 'mocked-id' }]
    };

    const action = removeIngredient('mocked-id');
    const state = reducer(stateWithIngredients, action);

    expect(state.ingredients).toHaveLength(0);
  });

  it('should clear all ingredients', () => {
    const stateWithData: IConstructorState = {
      bun: { ...bunData, id: 'mocked-id' },
      ingredients: [{ ...ingredientData, id: 'mocked-id' }]
    };

    const state = reducer(stateWithData, clearIngredients());

    expect(state).toEqual(initialState);
  });
});
