import { TOrder } from '@utils-types';
import {
  closeOrderModal,
  createOrderAction,
  fetchOrderByIdAction,
  fetchOrdersAction,
  ordersReducer
} from './ordersSlice';

describe('orderSlice', () => {
  const initialState = {
    orders: [],
    orderRequest: false,
    orderModalRequest: false,
    orderModalData: {} as TOrder,
    error: null
  };

  describe('reducers', () => {
    describe('closeOrderModal', () => {
      it('должен закрывать модальное окно', () => {
        const action = closeOrderModal();
        const nextState = ordersReducer(initialState, action);

        expect(nextState.orderModalData).toBeNull();
      });
    });
  });

  describe('async actions', () => {
    describe('fetchOrdersAction', () => {
      it('должен обработать pending состояние', () => {
        const action = { type: fetchOrdersAction.pending.type };
        const nextState = ordersReducer(initialState, action);

        expect(nextState.orderRequest).toBe(true);
      });

      it('должен обработать fulfilled состояние', () => {
        const mockOrders: TOrder[] = [
          {
            _id: '675828a8e367de001daf80d0',
            ingredients: [
              '643d69a5c3f7b9001cfa093c',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa0943'
            ],
            status: 'done',
            name: 'Краторный space био-марсианский бургер',
            createdAt: '2024-12-10T11:40:24.155Z',
            updatedAt: '2024-12-10T11:40:24.824Z',
            number: 62120
          },
          {
            _id: '675828bee367de001daf80d3',
            ingredients: [
              '643d69a5c3f7b9001cfa093c',
              '643d69a5c3f7b9001cfa093e',
              '643d69a5c3f7b9001cfa0947'
            ],
            status: 'done',
            name: 'Краторный фалленианский люминесцентный бургер',
            createdAt: '2024-12-10T11:40:46.889Z',
            updatedAt: '2024-12-10T11:40:58.992Z',
            number: 62122
          }
        ];
        const action = {
          type: fetchOrdersAction.fulfilled.type,
          payload: mockOrders
        };
        const nextState = ordersReducer(initialState, action);

        expect(nextState.orders).toEqual(mockOrders);
        expect(nextState.orderRequest).toBe(false);
        expect(nextState.error).toBeNull();
      });

      it('должен обработать rejected состояние', () => {
        const action = {
          type: fetchOrdersAction.rejected.type,
          error: { message: 'Test error' }
        };
        const nextState = ordersReducer(initialState, action);

        expect(nextState.orderRequest).toBe(false);
        expect(nextState.error).toBe('Test error');
      });
    });

    describe('fetchOrderByIdAction', () => {
      it('должен обработать pending состояние', () => {
        const action = { type: fetchOrderByIdAction.pending.type };
        const nextState = ordersReducer(initialState, action);

        expect(nextState.orderModalRequest).toBe(true);
      });

      it('должен обработать fulfilled состояние', () => {
        const mockOrder: TOrder = {
          _id: '675828a8e367de001daf80d0',
          ingredients: [
            '643d69a5c3f7b9001cfa093c',
            '643d69a5c3f7b9001cfa0941',
            '643d69a5c3f7b9001cfa0943'
          ],
          status: 'done',
          name: 'Краторный space био-марсианский бургер',
          createdAt: '2024-12-10T11:40:24.155Z',
          updatedAt: '2024-12-10T11:40:24.824Z',
          number: 62120
        };
        const action = {
          type: fetchOrderByIdAction.fulfilled.type,
          payload: mockOrder
        };
        const nextState = ordersReducer(initialState, action);

        expect(nextState.orderModalData).toEqual(mockOrder);
        expect(nextState.orderModalRequest).toBe(false);
        expect(nextState.error).toBeNull();
      });
    });

    describe('createOrderAction', () => {
      it('должен обработать fulfilled состояние', () => {
        const mockOrder = {
          order: {
            _id: '675828a8e367de001daf80d0',
            ingredients: [
              '643d69a5c3f7b9001cfa093c',
              '643d69a5c3f7b9001cfa0941',
              '643d69a5c3f7b9001cfa0943'
            ],
            status: 'done',
            name: 'Краторный space био-марсианский бургер',
            createdAt: '2024-12-10T11:40:24.155Z',
            updatedAt: '2024-12-10T11:40:24.824Z',
            number: 62120
          }
        };
        const action = {
          type: createOrderAction.fulfilled.type,
          payload: mockOrder
        };
        const nextState = ordersReducer(initialState, action);

        expect(nextState.orders).toHaveLength(1);
        expect(nextState.orderModalData).toEqual(mockOrder.order);
        expect(nextState.orderModalRequest).toBe(false);
        expect(nextState.error).toBeNull();
      });
    });
  });
});
