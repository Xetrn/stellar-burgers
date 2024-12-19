import { describe, expect, test } from '@jest/globals';

import { ingredientsReducer } from '@src/services/slices/ingredients';
import { feedsReducer } from '@src/services/slices/feed';
import { constructorReducer } from '@src/services/slices/consctructor';
import { ordersReducer } from '@src/services/slices/orders';
import { userReducer } from '@src/services/slices/user';

import store from '@src/services/store';

describe('Проверка состояния по умолчанию', () => {
    test('Проверка store', () => {
        expect(store.getState()).toEqual({
            ingredientsReducer: expect.any(Object),
            feedsReducer: expect.any(Object),
            userReducer: expect.any(Object),
            constructorReducer: expect.any(Object),
            ordersReducer: expect.any(Object)
        });
    });

    test('Проверка ingredientsReducer', () => {
        expect(ingredientsReducer(undefined, { type: '@INIT' })).toEqual({
            isLoading: true,
            isError: false,
            ingredients: [],
            buns: [],
            mains: [],
            sauces: []
        });
    });

    test('Проверка feedsReducer', () => {
        expect(feedsReducer(undefined, { type: '@INIT' })).toEqual({
            isLoading: false,
            isError: false,
            orders: [],
            total: 0,
            totalToday: 0
        });
    });

    test('Проверка constructorReducer', () => {
        expect(constructorReducer(undefined, { type: '@INIT' })).toEqual({
            constructorItems: { bun: null, ingredients: [] },
            ingredientId: 0,
            order: null,
            isOrderCreating: false,
            isError: false
        });
    });

    test('Проверка ordersReducer', () => {
        expect(ordersReducer(undefined, { type: '@INIT' })).toEqual({
            orders: [],
            isLoading: false,
            isError: false
        });
    });

    test('Проверка userReducer', () => {
        expect(userReducer(undefined, { type: '@INIT' })).toEqual({
            user: undefined,
            isAuth: false,
            error: ''
        });
    });
});
