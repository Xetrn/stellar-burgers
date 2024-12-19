import { getIngredients, ingredientsReducer, initialState } from '@src/services/slices/ingredients';

describe('Тестирование ingredients', () => {
    describe('Тест асинхронного запроса', () => {
        test('Тестирование при статусе ожидание', () => {
            const state = ingredientsReducer(initialState, getIngredients.pending('pending'));

            expect(state.isLoading).toBe(true);
            expect(state.isError).toBe(false);
        });

        test('Тестирование при статусе выполнен', () => {
            const value = [
                {
                    _id: '643d69a5c3f7b9001cfa093f',
                    name: 'Мясо бессмертных моллюсков Protostomia',
                    type: 'main',
                    proteins: 433,
                    fat: 244,
                    carbohydrates: 33,
                    calories: 420,
                    price: 1337,
                    image: 'https://code.s3.yandex.net/react/code/meat-02.png',
                    image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
                    image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
                    __v: 0
                }
            ];

            const state = ingredientsReducer(initialState, getIngredients.fulfilled(value, 'fulfilled'));

            expect(state.isLoading).toBe(false);
            expect(state.isError).toBe(false);

            expect(state.mains).toEqual(value);
        });

        test('Тестирование при статусе ошибка', () => {
            const state = ingredientsReducer(initialState, getIngredients.rejected(new Error(), 'rejected'));

            expect(state.isLoading).toBe(false);
            expect(state.isError).toBe(true);
        });
    });
});
