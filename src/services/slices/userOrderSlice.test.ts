import { expect, test, describe } from '@jest/globals';
import { userOrderSlice, getOrdersUser } from '../slices/userOrderSlice';
import { TOrdersState } from '../slices/userOrderSlice';

const mockUserOrder = [
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

const initialState: TOrdersState = {
    orders: [],
    isLoading: true
  };

describe('Тестирование userOrderSlice', () => {
    test('getOrdersUser.pending устанавливает флаг загрузки', () => {
      const action = { type: getOrdersUser.pending.type };
      const newState = userOrderSlice.reducer(initialState, action);
      const expectedState: TOrdersState = {
        ...initialState,
        isLoading: true
      };
      expect(newState).toEqual(expectedState);
    });
  
    test('getOrdersUser.fulfilled успешно загружает заказы', () => {
      const action = {
        type: getOrdersUser.fulfilled.type,
        payload: mockUserOrder
      };
      const newState = userOrderSlice.reducer(initialState, action);
      const expectedState: TOrdersState = {
        ...initialState,
        orders: mockUserOrder,
        isLoading: false
      };
      expect(newState).toEqual(expectedState);
    });
  
    test('getOrdersUser.rejected завершает загрузку с флагом isLoading = false', () => {
      const action = { type: getOrdersUser.rejected.type };
      const newState = userOrderSlice.reducer(initialState, action);
      const expectedState: TOrdersState = {
        ...initialState,
        isLoading: false
      };
      expect(newState).toEqual(expectedState);
    });
  });