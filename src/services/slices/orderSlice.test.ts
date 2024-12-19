import { TOrderResponse, TNewOrderResponse } from '../../utils/burger-api';
import { expect, test, describe } from '@jest/globals';
import orderReducer, { clearOrder, setOrderData, fetchOrderByNumber, createOrder } from '../slices/orderSlice';
import { TOrderState } from '../slices/orderSlice';

export const mockOrderResponse: TOrderResponse = {
  success: true,
  orders: [
    {
      _id: '67627d2e750864001d3722e5',
      ingredients: [
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Метеоритный бургер',
      createdAt: '2024-12-18T07:43:42.331Z',
      updatedAt: '2024-12-18T07:43:43.383Z',
      number: 63153
    }
  ]
};

export const mockOrderToPostResponse: TNewOrderResponse = {
  success: true,
  order: {
    _id: '67627d2e750864001d3722e5',
    ingredients: [
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093f',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Метеоритный бургер',
    createdAt: '2024-12-18T07:43:42.331Z',
    updatedAt: '2024-12-18T07:43:43.383Z',
    number: 63153
  },
  name: 'Artem'
};


const initialOrderState: TOrderState = {
    orderRequest: false,
    orderModalData: null,
    orderError: null,
    orderData: []
  };
  
describe('Тестирование orderSlice', () => {
    test('действие clearOrder очищает состояние заказа', () => {
      const state = {
        ...initialOrderState,
        orderModalData: mockOrderResponse.orders[0],
        orderError: 'Ошибка',
        orderRequest: true
      };
      const newState = orderReducer(state, clearOrder());
      expect(newState).toEqual(initialOrderState);
    });
  
    test('действие setOrderData добавляет данные заказов', () => {
      const mockOrders = mockOrderResponse.orders;
      const newState = orderReducer(initialOrderState, setOrderData(mockOrders));
      expect(newState.orderData).toEqual(mockOrders);
    });
  
    test('fetchOrderByNumber.pending устанавливает флаг загрузки', () => {
      const action = { type: fetchOrderByNumber.pending.type };
      const newState = orderReducer(initialOrderState, action);
      expect(newState.orderRequest).toBe(true);
      expect(newState.orderError).toBeNull();
    });
  
    test('fetchOrderByNumber.fulfilled сохраняет данные заказа', () => {
      const action = { type: fetchOrderByNumber.fulfilled.type, payload: mockOrderResponse.orders[0] };
      const newState = orderReducer(initialOrderState, action);
      expect(newState.orderRequest).toBe(false);
      expect(newState.orderModalData).toEqual(mockOrderResponse.orders[0]);
    });
  
    test('fetchOrderByNumber.rejected сохраняет ошибку', () => {
      const action = { type: fetchOrderByNumber.rejected.type, payload: 'Заказ не найден' };
      const newState = orderReducer(initialOrderState, action);
      expect(newState.orderRequest).toBe(false);
      expect(newState.orderError).toBe('Заказ не найден');
    });
  
    test('createOrder.pending устанавливает флаг загрузки', () => {
      const action = { type: createOrder.pending.type };
      const newState = orderReducer(initialOrderState, action);
      expect(newState.orderRequest).toBe(true);
      expect(newState.orderError).toBeNull();
    });
  
    test('createOrder.fulfilled сохраняет новый заказ', () => {
      const action = { type: createOrder.fulfilled.type, payload: mockOrderToPostResponse.order };
      const newState = orderReducer(initialOrderState, action);
      expect(newState.orderRequest).toBe(false);
      expect(newState.orderModalData).toEqual(mockOrderToPostResponse.order);
    });
  
    test('createOrder.rejected сохраняет ошибку', () => {
      const action = { type: createOrder.rejected.type, payload: 'Ошибка создания заказа' };
      const newState = orderReducer(initialOrderState, action);
      expect(newState.orderRequest).toBe(false);
      expect(newState.orderError).toBe('Ошибка создания заказа');
    });
  });
