import Reducer, {
  addIngredient,
  resetSelect,
  removeIngredient,
  moveIngredient,
  initialState,
  selectConstructorItems
} from './constructor.slice';
import ingredientsMock from '../../../../cypress/fixtures/ingredients.json';
import { TConstructorIngredient } from '@utils-types';
import { configureStore } from '@reduxjs/toolkit';
import { BunInitial } from '../../../services/types';
const bunMock: TConstructorIngredient = {
  ...ingredientsMock.data[0],
  id: '0'
};
const ingredientMock: TConstructorIngredient = {
  ...ingredientsMock.data[1],
  id: '1'
};
const ingredientMock2: TConstructorIngredient = {
  ...ingredientsMock.data[2],
  id: '2'
};
const initialStateWithIngredients = {
  bun: BunInitial,
  ingredients: [ingredientMock, ingredientMock2]
};

describe('Тесты редьюсера конструктора', () => {
  test('При добавлении булки, она не записывается в ингредиенты и хранится в bun', () => {
    const newState = Reducer(initialState, addIngredient(bunMock));
    const { ingredients, bun } = newState;

    expect(ingredients).toEqual([]);
    expect(bun).toEqual({
      _id: bunMock._id,
      image: bunMock.image,
      name: bunMock.name,
      price: bunMock.price
    });
  });

  test('При добавлении ингредиента, он заносится в массив', () => {
    const newState = Reducer(initialState, addIngredient(ingredientMock));
    const { ingredients, bun } = newState;

    expect(ingredients).toEqual([ingredientMock]);
    expect(bun).toEqual(BunInitial);
  });

  test('При удалении ингредиента, он удаляется из массива', () => {
    const newState = Reducer(
      initialStateWithIngredients,
      removeIngredient('1')
    );
    const { ingredients, bun } = newState;

    expect(ingredients).toEqual([ingredientMock2]);
    expect(bun).toEqual(BunInitial);
  });

  test('При сбросе конструктора, возвращается в начальное состояние', () => {
    const initialStateWithAll = {
      bun: bunMock,
      ingredients: [ingredientMock]
    };

    const newState = Reducer(initialStateWithAll, resetSelect());
    const { ingredients, bun } = newState;

    expect(ingredients).toEqual([]);
    expect(bun).toEqual(BunInitial);
  });

  test('Перемещение ингредиентов в массиве работает корректно', () => {
    const newState = Reducer(
      initialStateWithIngredients,
      moveIngredient({ newIndex: 1, index: 0 })
    );
    const { ingredients, bun } = newState;

    expect(ingredients).toEqual([ingredientMock2, ingredientMock]);
    expect(bun).toEqual(BunInitial);
  });
});

describe('тесты селекторов', () => {
  test('ингредиенты без булки', () => {
    const store = configureStore({
      reducer: {
        constructorSlice: Reducer
      },
      preloadedState: {
        constructorSlice: {
          bun: BunInitial,
          ingredients: []
        }
      }
    });
    store.dispatch(addIngredient(ingredientMock));
    const constructorItems = selectConstructorItems(store.getState());
    expect(constructorItems.bun).toEqual(BunInitial);

    expect(constructorItems.ingredients).toEqual([ingredientMock]);
  });
});
