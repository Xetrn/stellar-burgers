import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { userSlice } from './slices/userSlice';
import { feedsSlice } from './slices/feedsSlice';
import { ingredientsSlice } from './slices/ingredientsSlice';
import { constructorSlice } from './slices/constructorSlice';
import { newOrderSlice } from './slices/newOrderSlice';
import { userOrdersSlice } from './slices/userOrdersSlice';

const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [feedsSlice.name]: feedsSlice.reducer,
    [ingredientsSlice.name]: ingredientsSlice.reducer,
    [constructorSlice.name]: constructorSlice.reducer,
    [newOrderSlice.name]: newOrderSlice.reducer,
    [userOrdersSlice.name]: userOrdersSlice.reducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
