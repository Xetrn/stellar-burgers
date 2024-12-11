import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { IngredientsSlice } from '../components/burger-ingredients/ingredients-slice/ingredients.slice';
import { ConstructorSlice } from '../pages/constructor-page/constructor-slice/constructor.slice';
import { FeedSlice } from '../pages/feed/feed-slice/feed-slice';
import { OrderModalSlice } from '../components/order-info/order-info-slice/order-modal-slice';
import { OrderCardSlice } from '../components/order-card/order-card-slice/order-card-slice';
import { OrderCard } from '@components';
import { UserSlice } from './user-slice/user.slice';

const rootReducer = {
  [IngredientsSlice.name]: IngredientsSlice.reducer,
  [ConstructorSlice.name]: ConstructorSlice.reducer,
  [FeedSlice.name]: FeedSlice.reducer,
  [OrderModalSlice.name]: OrderModalSlice.reducer,
  [OrderCardSlice.name]: OrderCardSlice.reducer,
  [UserSlice.name]: UserSlice.reducer
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
