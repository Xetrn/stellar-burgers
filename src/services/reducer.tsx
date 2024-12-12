import { orderConstructorSlice as constructor } from './slices/orderConstructorSlice';
import { ordersFeedSlice as ordersFeed } from './slices/ordersFeedSlice';
import { ingredientsSlice as ingredients } from './slices/ingredientsSlice';
import { createOrderSlice as newOrder } from './slices/createOrderSlice';
import { userOrdersSlice as userOrders } from './slices/userOrdersSlice';
import { userSlice as user } from './slices/userSlice';

const reducer = {
  [ingredients.name]: ingredients.reducer,
  [constructor.name]: constructor.reducer,
  [userOrders.name]: userOrders.reducer,
  [ordersFeed.name]: ordersFeed.reducer,
  [newOrder.name]: newOrder.reducer,
  [user.name]: user.reducer
};

export default reducer;
