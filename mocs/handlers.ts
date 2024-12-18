import { http, HttpResponse, Path } from 'msw';

import ingredients from '../cypress/fixtures/ingredients.json';

const api = process.env.BURGER_API_URL as Path;

export const ApiRoutes = {
  getIngredients: 'https://norma.nomoreparties.space/api/ingredients',
  getFeed: 'https://norma.nomoreparties.space/api/orders/all',
  getOrder: 'https://norma.nomoreparties.space/api/orders/*',
  postOrder: 'https://norma.nomoreparties.space/api/orders',
  getUser: 'https://norma.nomoreparties.space/api/auth/user'
};
export const handlers = [
  http.get(ApiRoutes.getIngredients, () => HttpResponse.json(ingredients))
];
