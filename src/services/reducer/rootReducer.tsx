import { combineReducers } from 'redux';
import { userSlice } from '../slices/userSlice';
import { ingredientsSlice } from '../slices/ingredientsSlice';
import { orderConstructorSlice } from '../slices/orderConstructorSlice';
import { feedsSlice } from '../slices/ordersFeedSlice';
import { userOrdersSlice } from '../slices/userOrdersSlice';
import { createOrderSlice } from '../slices/createOrderSlice';

export const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [userOrdersSlice.name]: userOrdersSlice.reducer,
  [orderConstructorSlice.name]: orderConstructorSlice.reducer,
  [createOrderSlice.name]: createOrderSlice.reducer,
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [feedsSlice.name]: feedsSlice.reducer
});
