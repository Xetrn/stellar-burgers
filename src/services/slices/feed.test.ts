import { feedsReducer, getFeeds, initialState } from '@src/services/slices/feed';

describe('Тестирование feeds', () => {
    describe('Тест асинхронного запроса', () => {
        test('Тестирование при статусе ожидание', () => {
            const state = feedsReducer(initialState, getFeeds.pending('pending'));

            expect(state.isLoading).toBe(true);
            expect(state.isError).toBe(false);
        });

        test('Тестирование при статусе выполнен', () => {
            const value = {
                success: true,
                orders: [],
                total: 1,
                totalToday: 1
            };

            const state = feedsReducer(initialState, getFeeds.fulfilled(value, 'fulfilled'));

            expect(state.isLoading).toBe(false);
            expect(state.isError).toBe(false);

            expect(state.orders).toEqual(value.orders);
            expect(state.total).toEqual(value.total);
            expect(state.totalToday).toEqual(value.totalToday);
        });

        test('Тестирование при статусе ошибка', () => {
            const state = feedsReducer(initialState, getFeeds.rejected(new Error(), 'rejected'));

            expect(state.isLoading).toBe(false);
            expect(state.isError).toBe(true);
        });
    });
});
