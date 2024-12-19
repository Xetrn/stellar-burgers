import { configureStore, combineReducers } from '@reduxjs/toolkit';

import burgerConstructorReducer from './slices/burger-constructor-slice/burger-constructor-slice';
import feedReducer from './slices/feed-slice/feed-slice';
import ingredientsReducer from './slices/ingredients-slice/ingredients-slice';
import orderReducer from './slices/order-slice/order-slice';
import userReducer from './slices/user-slice/user-slice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  feed: feedReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  user: userReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
