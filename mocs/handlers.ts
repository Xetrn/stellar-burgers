import { http, HttpResponse, Path } from 'msw';

import ingredients from '../cypress/fixtures/ingredients.json';
import feed from '../cypress/fixtures/feed.json';
import getOrder from '../cypress/fixtures/getOrder.json';
import user from '../cypress/fixtures/user.json';
import postOrder from '../cypress/fixtures/postOrderResponse.json';
import newUser from '../cypress/fixtures/user.json';

const api = process.env.BURGER_API_URL as Path;

export const ApiRoutes = {
  getIngredients: 'https://norma.nomoreparties.space/api/ingredients',
  getFeed: 'https://norma.nomoreparties.space/api/orders/all',
  getOrder: 'https://norma.nomoreparties.space/api/orders/*',
  postOrder: 'https://norma.nomoreparties.space/api/orders',
  getUser: 'https://norma.nomoreparties.space/api/auth/user',
  getUserOrder: 'https://norma.nomoreparties.space/api/orders',
  updateUserData: 'https://norma.nomoreparties.space/api/auth/user'
};
export const handlers = [
  http.get(ApiRoutes.getIngredients, () => HttpResponse.json(ingredients)),
  http.get(ApiRoutes.getFeed, () => HttpResponse.json(feed)),
  http.get(ApiRoutes.getUser, () => HttpResponse.json(user)),
  http.get(ApiRoutes.getOrder, () => HttpResponse.json(getOrder)),
  http.get(ApiRoutes.postOrder, () => HttpResponse.json(postOrder)),
  http.get(ApiRoutes.getUserOrder, () =>
    HttpResponse.json({ orders: feed.orders, success: true })
  ),
  http.patch(ApiRoutes.updateUserData, () =>
    HttpResponse.json({ email: 'new', name: 'new' })
  )
];
