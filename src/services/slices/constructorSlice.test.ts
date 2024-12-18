import { TIngredient } from '@utils-types';
import {
  addIngredient,
  clearConstructor,
  constructorReducer,
  removeIngredient,
  swapIngredient
} from './constructorSlice';

describe('constructorSlice reducer', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  const bun: TIngredient = {
    _id: '1',
    calories: 420,
    carbohydrates: 53,
    fat: 24,
    image: 'image.jpg',
    image_mobile: 'image_mobile.jpg',
    image_large: 'image_large.jpg',
    name: 'Bun',
    price: 100,
    proteins: 8,
    type: 'bun'
  };

  const ingredient: TIngredient = {
    _id: '2',
    name: 'Ingredient',
    type: 'main',
    price: 2,
    image: 'ingredient.jpg',
    image_mobile: 'ingredient_mobile.jpg',
    image_large: 'ingredient_large.jpg',
    proteins: 10,
    fat: 15,
    carbohydrates: 20,
    calories: 100
  };

  it('должен обрабатывать начальное состояние', () => {
    expect(constructorReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('должен добавлять булку', () => {
    const actual = constructorReducer(initialState, addIngredient(bun));
    expect(actual.bun).toEqual({ ...bun, id: bun._id });
  });

  it('должен добавлять ингредиент', () => {
    const actual = constructorReducer(initialState, addIngredient(ingredient));
    expect(actual.ingredients).toEqual([{ ...ingredient, id: ingredient._id }]);
  });

  it('должен удалять ингридиенты', () => {
    const stateWithIngredient = {
      bun: null,
      ingredients: [{ ...ingredient, id: ingredient._id }]
    };
    const actual = constructorReducer(stateWithIngredient, removeIngredient(0));
    expect(actual.ingredients).toEqual([]);
  });

  it('должен менять ингридиенты местами', () => {
    const stateWithIngredients = {
      bun: null,
      ingredients: [
        { ...ingredient, id: '2' },
        { ...ingredient, id: '3' }
      ]
    };
    const actual = constructorReducer(
      stateWithIngredients,
      swapIngredient({ first: 0, second: 1 })
    );
    expect(actual.ingredients).toEqual([
      { ...ingredient, id: '3' },
      { ...ingredient, id: '2' }
    ]);
  });

  it('должен очищать конструктор', () => {
    const stateWithIngredients = {
      bun: { ...bun, id: bun._id },
      ingredients: [{ ...ingredient, id: ingredient._id }]
    };
    const actual = constructorReducer(stateWithIngredients, clearConstructor());
    expect(actual).toEqual(initialState);
  });
});
