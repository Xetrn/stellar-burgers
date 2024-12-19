import { expect, test, describe } from '@jest/globals';
import {
  builderSlice,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearBuilder,
  initialState
} from '../src/services/builderSlice';
import {
  constructorIngredientBun,
  constructorIngredientMain,
  constructorIngredientSauce,
  ingredientBun,
  ingredientMain,
  ingredientSauce
} from './mocks';

const mockState: typeof initialState = {
  bun: constructorIngredientBun,
  ingredients: [constructorIngredientMain, constructorIngredientSauce]
};

describe('Тесты проверяющие работу builderReducer', () => {
  test('Проверка начального состояния', () => {
    const state = builderSlice.reducer(undefined, { type: 'unknown' });
    expect(state).toStrictEqual(initialState);
  });

  describe('Добавление ингредиентов в конструктор бургера', () => {
    test('Добавление булки в состояние', () => {
      const action = addIngredient(ingredientBun);
      const state = builderSlice.reducer(initialState, action);
      expect(state.bun).toStrictEqual(constructorIngredientBun);
      expect(state.ingredients).toHaveLength(0);
    });

    test('Добавление начинки в конструктор', () => {
      const action = addIngredient(ingredientMain);
      const state = builderSlice.reducer(initialState, action);
      expect(state.ingredients[0]).toStrictEqual(constructorIngredientMain);
      expect(state.bun).toBe(null);
    });

    test('Добавление соуса в конструктор', () => {
      const action = addIngredient(ingredientSauce);
      const state = builderSlice.reducer(initialState, action);
      expect(state.ingredients[0]).toStrictEqual(constructorIngredientSauce);
      expect(state.bun).toBe(null);
    });
  });

  describe('Удаление ингредиентов из конструктора бургера', () => {
    test('Удаление начинки из конструктора', () => {
      const action = removeIngredient(constructorIngredientMain.id);
      const state = builderSlice.reducer(mockState, action);
      expect(state.ingredients).toStrictEqual([constructorIngredientSauce]);
      expect(state.ingredients).toHaveLength(1);
    });

    test('Удаление соуса из конструктора', () => {
      const action = removeIngredient(constructorIngredientSauce.id);
      const state = builderSlice.reducer(mockState, action);
      expect(state.ingredients).toStrictEqual([constructorIngredientMain]);
      expect(state.ingredients).toHaveLength(1);
    });

    test('Удаление несуществующего ингредиента не влияет на состояние', () => {
      const action = removeIngredient('123');
      const state = builderSlice.reducer(mockState, action);
      expect(state.ingredients).toStrictEqual(mockState.ingredients);
      expect(state.ingredients).toHaveLength(2);
    });
  });

  describe('Изменение порядка ингредиентов в конструкторе бургера', () => {
    test('Перемещение ингредиента вниз', () => {
      const action = moveIngredientDown(0);
      const state = builderSlice.reducer(mockState, action);
      expect(state.ingredients).toStrictEqual([
        constructorIngredientSauce,
        constructorIngredientMain
      ]);
    });

    test('Перемещение ингредиента вверх', () => {
      const action = moveIngredientUp(1);
      const state = builderSlice.reducer(mockState, action);
      expect(state.ingredients).toStrictEqual([
        constructorIngredientSauce,
        constructorIngredientMain
      ]);
    });

    test('Попытка перемещения ингредиента вверх за пределы массива', () => {
      const action = moveIngredientUp(10);
      const state = builderSlice.reducer(mockState, action);
      expect(state.ingredients).toStrictEqual(mockState.ingredients);
    });

    test('Попытка перемещения ингредиента вниз с отрицательным индексом', () => {
      const action = moveIngredientDown(-5);
      const state = builderSlice.reducer(mockState, action);
      expect(state.ingredients).toStrictEqual(mockState.ingredients);
    });
  });

  describe('Очищение конструктора бургера', () => {
    test('Очищение конструктора', () => {
      const action = clearBuilder();
      const state = builderSlice.reducer(mockState, action);
      expect(state).toStrictEqual(initialState);
    });
  });
});
