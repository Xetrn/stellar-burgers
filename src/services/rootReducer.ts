import { constructorIngredientSlice as constructor } from './slices/constructorIngredientSlice';
import { feedsSlice as feeds } from './slices/feedsSlice';
import { ingredientsSlice as ingredients } from './slices/ingredientsSlice';
import { newOrderSlice as newOrder } from './slices/newOrderSlice';
import { userOrdersSlice as userOrders } from './slices/userOrdersSlice';
import { userSlice as user } from './slices/userSlice';

const rootReducer = {
  [constructor.name]: constructor.reducer,
  [feeds.name]: feeds.reducer,
  [ingredients.name]: ingredients.reducer,
  [newOrder.name]: newOrder.reducer,
  [userOrders.name]: userOrders.reducer,
  [user.name]: user.reducer
};

export default rootReducer;
