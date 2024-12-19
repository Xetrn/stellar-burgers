import { combineReducers } from '@reduxjs/toolkit';
import { burgerConstructorReducer } from '../slices/constructorSlice';
import { ingredientsSliceReducer } from '../slices/ingredientsSlice';
import { feedsReducer } from '../slices/feedsSlice';
import { userReducer } from '../slices/userSlice';
import { userOrdersReducer } from '../slices/userOrdersSlice';
import { newOrderReducer } from '../slices/newOrderSlice';

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  ingredients: ingredientsSliceReducer,
  feeds: feedsReducer,
  user: userReducer,
  userOrders: userOrdersReducer,
  newOrder: newOrderReducer
});
