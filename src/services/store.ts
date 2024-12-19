import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch as dispatch, useSelector as selector } from 'react-redux';

import { ingredientsReducer } from './slices/ingredients';
import { feedsReducer } from './slices/feed';
import { userReducer } from './slices/user';
import { constructorReducer } from './slices/consctructor';
import { ordersReducer } from './slices/orders';

const store = configureStore({
    reducer: {
        ingredientsReducer,
        feedsReducer,
        userReducer,
        constructorReducer,
        ordersReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatch();
export const useSelector: TypedUseSelectorHook<RootState> = selector;

export default store;
