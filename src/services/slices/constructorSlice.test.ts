import { expect, describe, test } from '@jest/globals';
import constructorReducer, {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from './constructorSlice';

// Моковые ингредиенты
const testBun = {
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
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0,
  id: '1'
};

const testIngredient = {
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
  __v: 0,
  id: '2'
};

const testSauce = {
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  __v: 0,
  id: '3'
};

// Начальное состояние
const initialState = {
  bun: null,
  ingredients: []
};

// Тесты
describe('Проверка работы constructorSlice', () => {
  test('Инициализация: состояние по умолчанию', () => {
    const state = constructorReducer(undefined, { type: '@INIT' });
    expect(state).toEqual(initialState);
  });

  test('Добавление булки', () => {
    const state = constructorReducer(initialState, setBun(testBun));
    expect(state.bun).toEqual(testBun);
  });

  test('Добавление ингредиента', () => {
    const state = constructorReducer(initialState, addIngredient(testIngredient));
    expect(state.ingredients).toContainEqual(testIngredient);
  });

  test('Удаление ингредиента', () => {
    const filledState = {
      bun: testBun,
      ingredients: [testIngredient, testSauce]
    };
    const state = constructorReducer(filledState, removeIngredient(testIngredient.id));
    expect(state.ingredients).not.toContainEqual(testIngredient);
    expect(state.ingredients).toHaveLength(1);
  });

  test('Перемещение ингредиентов', () => {
    const filledState = {
      bun: testBun,
      ingredients: [testIngredient, testSauce]
    };
    const state = constructorReducer(filledState, moveIngredient({ from: 1, to: 0 }));
    expect(state.ingredients).toEqual([testSauce, testIngredient]);
  });

  test('Очистка конструктора', () => {
    const filledState = {
      bun: testBun,
      ingredients: [testIngredient, testSauce]
    };
    const state = constructorReducer(filledState, clearConstructor());
    expect(state).toEqual(initialState);
  });
});
