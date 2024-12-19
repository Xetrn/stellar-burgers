import { expect, test } from '@jest/globals';
import {
  addItemToConstructor,
  clearConstructor,
  constructorSlice,
  deleteItemFromConstructor,
  initialState,
  updateConstructor
} from '../slices/constructor';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import swapElements from '../../utils/swap-elements';

const bun: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Первая булка',
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

const cutlet: TIngredient = {
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

const sauce: TIngredient = {
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
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
};

const burger = {
  bun: { ...bun, id: '0' },
  ingredients: [
    { ...cutlet, id: '1' },
    { ...sauce, id: '2' }
  ]
};

describe('Adding ingredients', () => {
  test('The constructor must be empty during initialization', () => {
    const testState = constructorSlice.reducer(undefined, { type: '' });
    expect(testState).toEqual(initialState);
  });

  test('Add a bun to an order', () => {
    const testState = constructorSlice.reducer(
      initialState,
      addItemToConstructor(bun as TConstructorIngredient)
    );
    expect(testState.bun).toEqual(expect.objectContaining(bun));
  });

  test('Add a cutlet to an order', () => {
    const testState = constructorSlice.reducer(
      initialState,
      addItemToConstructor(cutlet as TConstructorIngredient)
    );
    expect(testState.ingredients[0]).toEqual(expect.objectContaining(cutlet));
  });

  test('Add a sauce to an order', () => {
    const testState = constructorSlice.reducer(
      initialState,
      addItemToConstructor(sauce as TConstructorIngredient)
    );
    expect(testState.ingredients[0]).toEqual(expect.objectContaining(sauce));
  });
});

describe('Moving ingredients', () => {
  test('Moving an ingredient from position 2 to position 1', () => {
    const testState = constructorSlice.reducer(
      burger,
      updateConstructor(swapElements(burger.ingredients, 0, 1))
    );
    expect(testState.ingredients).toEqual([
      burger.ingredients[1],
      burger.ingredients[0]
    ]);
  });
});

describe('Removing ingredients', () => {
  test('Removing cutlet', () => {
    const testState = constructorSlice.reducer(
      burger,
      deleteItemFromConstructor(burger.ingredients[0])
    );
    expect(testState.ingredients).toHaveLength(1);
    expect(testState.ingredients).not.toContain(cutlet);
  });

  test('Removing sauce', () => {
    const testState = constructorSlice.reducer(
      burger,
      deleteItemFromConstructor(burger.ingredients[1])
    );
    expect(testState.ingredients).toHaveLength(1);
    expect(testState.ingredients).not.toContain(sauce);
  });
});

describe('Clear constructor', () => {
  test('Clear constructor', () => {
    const testState = constructorSlice.reducer(
      burger,
      deleteItemFromConstructor(burger.ingredients[0])
    );
    const clearResult = constructorSlice.reducer(testState, clearConstructor());
    expect(clearResult).toEqual(initialState);
  });
});

describe('Check constructor store', () => {
  test('The constructor must not change with an unknown action', () => {
    const testState = constructorSlice.reducer(initialState, {
      type: 'unknownAction'
    });
    expect(testState).toEqual(initialState);
  });
});
