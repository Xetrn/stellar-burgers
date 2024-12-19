import { rootReducer } from './store';
import { initialState as ingredientsInitialState } from './slices and tests/ingredientsSlice';
import { initialState as ordersInitialState } from './slices and tests/ordersSlice';
import { initialState as feedsInitialState } from './slices and tests/feedSlice';
import { initialState as burgerInitialState } from './slices and tests/constructorSlice';
import { initialState as authInitialState } from './slices and tests/authSlice';

describe('rootReducer', () => {
  test('returns initial state with undefined state and unknown action', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState.ingredients).toEqual(ingredientsInitialState);
    expect(initialState.orders).toEqual(ordersInitialState);
    expect(initialState.feeds).toEqual(feedsInitialState);
    expect(initialState.burger).toEqual(burgerInitialState);
    expect(initialState.auth).toEqual(authInitialState);
  });
});
