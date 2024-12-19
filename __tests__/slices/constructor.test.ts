import {
  constructorSlice,
  addIngredient,
  deleteIngredientById,
  setIngredients,
  moveIngredientUp,
  moveIngredientDown,
  resetConstructor,
  getConstructor
} from '../../src/services/slices';
import {
  initialState,
  bun,
  ingredients,
  initialStateWithOneIngredient,
  initialStateWithMultipleIngredients,
  initialFullState
} from '../../mocks/constructor';

describe('Слайс конструктора работает', () => {
  it('Конструктор инициализирован правильно', () => {
    const initialState = constructorSlice.reducer(undefined, {
      type: 'UNKNOWN_ACTION'
    });

    expect(initialState).toEqual(initialState);
  });

  it('Булочка добавляется', () => {
    const newState = constructorSlice.reducer(initialState, addIngredient(bun));

    expect(newState.bun).not.toBeNull();
    expect(newState.bun?._id).toBe(bun._id);
  });

  it('Ингредиент добавляется', () => {
    const newState = constructorSlice.reducer(
      initialState,
      addIngredient(ingredients[0])
    );

    expect(newState.ingredients).toHaveLength(1);
    expect(newState.bun).toBeNull();
  });

  it('Ингредиент удаляется', () => {
    const newState = constructorSlice.reducer(
      initialStateWithOneIngredient,
      deleteIngredientById('1')
    );

    expect(newState).toEqual(initialState);
  });

  it('Устанавливает список ингредиентов конструктора', () => {
    const newState = constructorSlice.reducer(
      initialState,
      setIngredients(ingredients)
    );

    expect(newState.ingredients).toEqual(ingredients);
    expect(newState.bun).toBeNull();
  });

  it('Игредиент перемещается вверх', () => {
    const newState = constructorSlice.reducer(
      initialStateWithMultipleIngredients,
      moveIngredientUp('2')
    );

    expect(newState).toEqual({
      bun: null,
      ingredients: [ingredients[1], ingredients[0], ingredients[2]]
    });
  });

  it('Игредиент перемещается вниз', () => {
    const newState = constructorSlice.reducer(
      initialStateWithMultipleIngredients,
      moveIngredientDown('2')
    );
    expect(newState).toEqual({
      bun: null,
      ingredients: [ingredients[0], ingredients[2], ingredients[1]]
    });
  });

  it('Конструктор сбрасывается', () => {
    const newState = constructorSlice.reducer(
      initialStateWithOneIngredient,
      resetConstructor()
    );
    expect(newState).toEqual(initialState);
  });

  it('Селектор getConstructor работает', () => {
    const newState = {
      [constructorSlice.name]: constructorSlice.reducer(initialFullState, {
        type: 'UNKNOWN_ACTION'
      })
    };

    expect(getConstructor(newState)).toEqual(initialFullState);
  });
});
