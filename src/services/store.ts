import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import {
  ConstructorReducer,
  FeedReducer,
  IngredientReducer,
  UserReducer
} from './slices';

const store = configureStore({
  reducer: {
    ingredients: IngredientReducer,
    feed: FeedReducer,
    user: UserReducer,
    ConstructorReducer //название constructor: всё ломает)))
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
