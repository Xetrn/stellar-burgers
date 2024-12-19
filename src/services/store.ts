import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import {
  ingredientsSlice,
  userSlice,
  myOrdersSlice,
  feedsSlice,
  newOrderSlice,
  constructorSlice
} from '@slices';

export const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [newOrderSlice.name]: newOrderSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [myOrdersSlice.name]: myOrdersSlice.reducer,
  [feedsSlice.name]: feedsSlice.reducer,
  [constructorSlice.name]: constructorSlice.reducer
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
