import { getOrders, initialState, ordersReducer } from '@src/services/slices/orders';

describe('Тестирование orders', () => {
    describe('Тест асинхронного запроса', () => {
        test('Тестирование при статусе ожидание', () => {
            const state = ordersReducer(initialState, getOrders.pending('pending'));

            expect(state.isLoading).toBe(true);
            expect(state.isError).toBe(false);
        });

        test('Тестирование при статусе выполнен', () => {
            const value = [
                {
                    _id: '675af59a750864001d370cd6',
                    ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093e'],
                    status: 'done',
                    name: 'Краторный люминесцентный бургер',
                    createdAt: '2024-12-12T14:39:22.707Z',
                    updatedAt: '2024-12-12T14:39:23.694Z',
                    number: 62565
                }
            ];

            const state = ordersReducer(initialState, getOrders.fulfilled(value, 'fulfilled'));

            expect(state.isLoading).toBe(false);
            expect(state.isError).toBe(false);

            expect(state.orders).toEqual(value);
        });

        test('Тестирование при статусе ошибка', () => {
            const state = ordersReducer(initialState, getOrders.rejected(new Error(), 'rejected'));

            expect(state.isLoading).toBe(false);
            expect(state.isError).toBe(true);
        });
    });
});
