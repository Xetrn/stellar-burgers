import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { constructorSlice } from './slices/constructor';
import { ingredientsSlice } from './slices/Ingredients';
import { feedsSlice } from './slices/feeds';
import { createOrderSlice } from './slices/create-order';
import { userSlice } from './slices/user';
import { userOrdersSlice } from './slices/user-orders';

const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [constructorSlice.name]: constructorSlice.reducer,
    [ingredientsSlice.name]: ingredientsSlice.reducer,
    [feedsSlice.name]: feedsSlice.reducer,
    [createOrderSlice.name]: createOrderSlice.reducer,
    [userOrdersSlice.name]: userOrdersSlice.reducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
