import { rootReducer } from './rootReducer';
import { initialState as userState } from '../slices/userSlice';
import { initialState as userOrdersState } from '../slices/userOrdersSlice';
import { initialState as ingredientsState } from '../slices/ingredientsSlice';
import { initialState as ordeersFeedsState } from '../slices/ordersFeedSlice';
import { initialState as orderConstructorInitialState } from '../slices/orderConstructorSlice';
import { initialState as createOrderState } from '../slices/createOrderSlice';

describe('Проверка начального состояния редьюсеров', () => {
  test('Состояния по умолчанию для каждого редьюсера', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState.user).toEqual(userState);
    expect(initialState.ingredients).toEqual(ingredientsState);
    expect(initialState.feeds).toEqual(ordeersFeedsState);
    expect(initialState.orderConstructor).toEqual(orderConstructorInitialState);
    expect(initialState.userOrders).toEqual(userOrdersState);
    expect(initialState.newOrder).toEqual(createOrderState);
  });
});
