import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import feedsReducer from './feedsSlice';
import userReducer from './userSlice';
import ingredientsReducer from './ingredientsSlice';
import ordersReducer from './ordersSlice';
import { combineReducers } from '@reduxjs/toolkit';
import builderReducer from './builderSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  feeds: feedsReducer,
  ingredients: ingredientsReducer,
  orders: ordersReducer,
  builder: builderReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
