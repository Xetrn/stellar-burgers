import { rootReducer } from './store';

describe('Store', () => {
  it('Должен инициализировать RootReducer', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toEqual({
      auth: {
        error: null,
        isAuth: false,
        isLoading: false,
        loginFormData: {
          email: '',
          password: ''
        },
        registerFormData: {
          email: '',
          name: '',
          password: ''
        },
        user: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      feed: {
        error: null,
        feed: null,
        isLoading: false
      },
      ingredients: {
        error: null,
        ingredients: [],
        ingredientsModalData: null,
        isLoading: false
      },
      orders: {
        error: null,
        orderModalData: null,
        orderModalRequest: false,
        orderRequest: false,
        orders: []
      }
    });
  });
});
