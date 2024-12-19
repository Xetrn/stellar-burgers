import { rootReducer } from '../src/services/store';

const initialStore = {
  ingredients: {
    ingredients: [],
    loading: true,
    error: null
  },
  order: {
    orderModalData: null,
    orderRequest: false,
    error: null
  },
  user: {
    isAuthorized: false,
    user: {
      name: '',
      email: ''
    },
    error: null,
    loading: true
  },
  myOrders: {
    orders: [],
    loading: true,
    error: null
  },
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: true,
    error: null
  },
  constructorIngredients: {
    bun: null,
    ingredients: []
  }
};

describe('Корневой редюсер работает', () => {
  it('Корневой редюсер инициализирован правильно', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(initialState).toEqual(initialStore);
  });
});
