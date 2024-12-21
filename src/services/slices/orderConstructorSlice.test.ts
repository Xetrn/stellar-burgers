import { v4 as uuidv4 } from 'uuid';
import {
  addIngredient,
  constructorSelector,
  initialState,
  orderConstructorSlice,
  removeIngredient,
  TOrderConstructorState
} from './orderConstructorSlice';

jest.mock('uuid', () => ({
  v4: jest.fn()
}));

const mockUuid = 'mocked-uuid';

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
  id: mockUuid,
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

describe('Тестирование конструктора бургеров', () => {
  beforeEach(() => {
    (uuidv4 as jest.Mock).mockReturnValue(mockUuid);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Проверка начального состояния', () => {
    const resultState = orderConstructorSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(resultState).toEqual(initialState);
  });

  test('Проверка работы селектора состояния конструктора', () => {
    const state = { orderConstructor: initialState };
    const selectedState = constructorSelector.selectItems(state);
    expect(selectedState).toEqual(initialState);
  });

  test('Добавление булки в конструктор', () => {
    const bunWithId = {
      ...bunData,
      id: mockUuid
    };
    const action = addIngredient(bunWithId);
    const updatedState = orderConstructorSlice.reducer(initialState, action);
    expect(updatedState.bun).toEqual(bunWithId);
    expect(updatedState.bun).toEqual({ ...bunData, id: mockUuid });
  });

  test('Добавление ингредиента в конструктор', () => {
    const ingredientWithId = {
      ...ingredientData,
      id: mockUuid
    };
    const action = addIngredient(ingredientWithId);
    const updatedState = orderConstructorSlice.reducer(initialState, action);

    expect(updatedState.ingredients).toHaveLength(1);
    expect(updatedState.ingredients[0]).toEqual({
      ...ingredientData,
      id: mockUuid
    });
  });

  test('Удаление булки из конструктора', () => {
    const stateWithBun: TOrderConstructorState = {
      bun: {
        ...bunData,
        id: mockUuid
      },
      ingredients: []
    };
    const action = removeIngredient(stateWithBun.ingredients[0]);
    const updatedState = orderConstructorSlice.reducer(stateWithBun, action);

    expect(updatedState.ingredients).toEqual([]);
  });

  test('Удаление ингредиента из конструктора', () => {
    const stateWithIngredient: TOrderConstructorState = {
      bun: null,
      ingredients: [
        {
          ...ingredientData,
          id: mockUuid
        }
      ]
    };
    const action = removeIngredient(stateWithIngredient.ingredients[1]);
    const updatedState = orderConstructorSlice.reducer(initialState, action);

    expect(updatedState.ingredients).toEqual([]);
    expect(updatedState.ingredients).toHaveLength(0);
  });
});
