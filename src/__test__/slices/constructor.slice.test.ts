const mockBun = {
  _id: 'bun1',
  name: 'Brioche Bun',
  type: 'bun',
  proteins: 10,
  fat: 5,
  carbohydrates: 30,
  calories: 150,
  price: 50,
  image: 'bun1.jpg',
  image_mobile: 'bun1_mobile.jpg',
  image_large: 'bun1_large.jpg'
};

const mockIngredient = {
  _id: 'ingredient1',
  name: 'Beef Patty',
  type: 'main',
  proteins: 20,
  fat: 10,
  carbohydrates: 0,
  calories: 200,
  price: 100,
  image: 'patty.jpg',
  image_mobile: 'patty_mobile.jpg',
  image_large: 'patty_large.jpg',
  id: 'unique-ingredient1'
};

const mockOrder = {
  _id: 'order1',
  status: 'pending',
  name: 'Order 1',
  createdAt: '2024-12-19T12:00:00Z',
  updatedAt: '2024-12-19T14:00:00Z',
  number: 1,
  ingredients: ['bun1', 'ingredient1']
};

import {
  ConstructorReducer,
  setConstructorBun,
  setConstructorIngredients,
  deleteConstructorIngredient,
  clearConstructor,
  setOrderRequest,
  setOrderModalData,
  updateConstructorIngredients
} from '../../services/slices/constructorSlice';
import { TIngredient, TConstructorIngredient, TOrder } from '../../utils/types';

interface IConstructorItems {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

interface IConstructorData {
  constructorItems: IConstructorItems;
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

describe('Constructor Slice Test', () => {
  const initialState: IConstructorData = {
    constructorItems: {
      bun: null,
      ingredients: [] as TConstructorIngredient[]
    },
    orderRequest: false,
    orderModalData: null
  };

  it('Проверка вернуть initialState', () => {
    expect(ConstructorReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('Проверка setConstructorBun', () => {
    const newState = ConstructorReducer(
      initialState,
      setConstructorBun(mockBun)
    );
    expect(newState.constructorItems.bun).toEqual(mockBun);
  });

  it('Проверка setConstructorIngredients', () => {
    const newState = ConstructorReducer(
      initialState,
      setConstructorIngredients(mockIngredient)
    );
    expect(newState.constructorItems.ingredients).toEqual([mockIngredient]);
  });

  it('Проверка deleteConstructorIngredient', () => {
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        bun: mockBun,
        ingredients: [mockIngredient]
      }
    };
    const newState = ConstructorReducer(
      stateWithIngredients,
      deleteConstructorIngredient(mockIngredient)
    );
    expect(newState.constructorItems.ingredients).toEqual([]);
  });

  it('Проверка clearConstructor', () => {
    const stateWithData = {
      constructorItems: {
        bun: mockBun,
        ingredients: [mockIngredient]
      },
      orderRequest: true,
      orderModalData: mockOrder
    };
    const newState = ConstructorReducer(stateWithData, clearConstructor()); //спасибо, у меня не работало)
    expect(newState).toEqual(initialState);
  });

  it('Проверка setOrderRequest', () => {
    const newState = ConstructorReducer(initialState, setOrderRequest(true));
    expect(newState.orderRequest).toBe(true);
  });

  it('Проверка setOrderModalData', () => {
    const newState = ConstructorReducer(
      initialState,
      setOrderModalData(mockOrder)
    );
    expect(newState.orderModalData).toEqual(mockOrder);
  });

  it('Проверка updateConstructorIngredients', () => {
    const mockIngredients = [
      mockIngredient,
      { ...mockIngredient, id: 'unique-ingredient2' }
    ];
    const newState = ConstructorReducer(
      initialState,
      updateConstructorIngredients(mockIngredients)
    );
    expect(newState.constructorItems.ingredients).toEqual(mockIngredients);
  });
});
