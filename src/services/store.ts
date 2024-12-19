import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientsReducer from './slices and tests/ingredientsSlice';
import orderReducer from './slices and tests/ordersSlice';
import feedsReducer from './slices and tests/feedSlice';
import constructorSlice from './slices and tests/constructorSlice';
import authSlice from './slices and tests/authSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  orders: orderReducer,
  feeds: feedsReducer,
  burger: constructorSlice,
  auth: authSlice
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
