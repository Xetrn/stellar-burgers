import { http, HttpResponse, Path } from 'msw';

import ingredients from '../cypress/fixtures/ingredients.json';

const api = process.env.BURGER_API_URL as Path;

export const ApiRoutes = {
  getIngredients: 'https://norma.nomoreparties.space/api/ingredients'
};
export const handlers = [
  http.get(ApiRoutes.getIngredients, () => HttpResponse.json(ingredients))
];
