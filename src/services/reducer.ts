import { constructorSlice as constructor } from './slices/constructorSlice';
import { feedSlice as ordersFeed } from './slices/feedSlice';
import { ingredientsSlice as ingredients } from './slices/ingredientsSlice';
import { createOrderSlice as newOrder } from './slices/createOrderSlice';
import { ordersSlice as userOrders } from './slices/ordersSlice';
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
