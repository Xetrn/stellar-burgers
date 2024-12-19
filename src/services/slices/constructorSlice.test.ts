import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';
import {
  addIngredient,
  constructorSelector,
  initialState,
  moveIngredientDown,
  moveIngredientUp,
  burgerConstructorReducer as reducer,
  removeIngredient,
  TConstructorState
} from './constructorSlice';

jest.mock('uuid', () => ({
  v4: jest.fn()
}));

const mockUuidValue = 'mocked-uuid';

const bunSample = {
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

const ingredientSample = {
  _id: '643d69a5c3f7b9001cfa0941',
  id: mockUuidValue,
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

const ingredientList: TConstructorIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa0941',
    id: '67a5d503-1a32-4af0-9d20-49d8d55d0bb4',
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
  },
  {
    _id: '643d69a5c3f7b9001cfa093e',
    id: '29996fa8-23e5-46f4-bb51-941ddf6e913f',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  }
];

describe('constructor slice', () => {
  beforeEach(() => {
    (uuidv4 as jest.Mock).mockReturnValue(mockUuidValue);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('initial state', () => {
    expect(reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  test('constructor state selector', () => {
    const state = { burgerConstructor: initialState };
    const result = constructorSelector.constructorSelector(state);
    expect(result).toEqual(initialState);
  });

  test('add bun to constructor', () => {
    const ingredient = {
      ...bunSample,
      id: mockUuidValue
    };
    const action = addIngredient(ingredient);
    const state = reducer(initialState, action);
    expect(state.bun).toEqual(ingredient);
    expect(state.bun).toEqual({ ...bunSample, id: mockUuidValue });
  });

  test('add ingredient to constructor', () => {
    const ingredient = {
      ...ingredientSample,
      id: mockUuidValue
    };
    const action = addIngredient(ingredient);
    const state = reducer(initialState, action);

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual({ ...ingredientSample, id: mockUuidValue });
  });

  test('remove bun from constructor', () => {
    const stateWithBun: TConstructorState = {
      bun: {
        ...bunSample,
        id: mockUuidValue
      },
      ingredients: []
    };
    const action = removeIngredient(stateWithBun.ingredients[0]);
    const state = reducer(stateWithBun, action);

    expect(state.ingredients).toEqual([]);
  });

  test('remove ingredient from constructor', () => {
    const stateWithIngredient: TConstructorState = {
      bun: null,
      ingredients: [
        {
          ...ingredientSample,
          id: mockUuidValue
        }
      ]
    };
    const action = removeIngredient(stateWithIngredient.ingredients[1]);
    const state = reducer(initialState, action);

    expect(state.ingredients).toHaveLength(0);
    expect(state.ingredients).toEqual([]);
  });

  test('move ingredient up in the list', () => {
    const stateWithIngredients: TConstructorState = {
      bun: null,
      ingredients: [...ingredientList]
    };
    const action = moveIngredientUp(1);
    const state = reducer(stateWithIngredients, action);

    expect(state.ingredients[0]).toEqual(ingredientList[1]);
    expect(state.ingredients[1]).toEqual(ingredientList[0]);
  });

  test('move ingredient down in the list', () => {
    const stateWithIngredients: TConstructorState = {
      bun: null,
      ingredients: [...ingredientList]
    };
    const action = moveIngredientDown(0);
    const state = reducer(stateWithIngredients, action);

    expect(state.ingredients[0]).toEqual(ingredientList[1]);
    expect(state.ingredients[1]).toEqual(ingredientList[0]);
  });
});
