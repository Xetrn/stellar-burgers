import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers/root-reducer';
import {
  TypedUseSelectorHook,
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase
} from 'react-redux';

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useSelector: TypedUseSelectorHook<RootState> = useSelectorBase;
export const useDispatch = () => useDispatchBase<AppDispatch>();

export default store;
