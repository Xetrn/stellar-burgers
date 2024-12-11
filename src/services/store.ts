import { configureStore } from '@reduxjs/toolkit';
import IngredientsReducer from './slices/ingredients.slice';
import FeedReducer from './slices/feed.slice';
import constructorReducer from './slices/constructor.slice';

export const store = configureStore({
  reducer: {
    ingredients: IngredientsReducer,
    feed: FeedReducer,
    constructor: constructorReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
