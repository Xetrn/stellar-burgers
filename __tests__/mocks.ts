import {
  TIngredient,
  TOrder,
  TConstructorIngredient,
  TUser
} from '../src/utils/types';
import {
  TFeedsResponse,
  TNewOrderResponse,
  TOrderResponse,
  TUserResponse,
  TRegisterData,
  TAuthResponse,
  TLoginData
} from '../src/utils/burger-api';

export const ingredientBun: TIngredient = {
  calories: 420,
  carbohydrates: 53,
  fat: 24,
  name: 'Краторная булка N-200i',
  price: 1255,
  proteins: 80,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  type: 'bun',
  _id: '643d69a5c3f7b9001cfa093c'
} as TIngredient;

export const constructorIngredientBun: TConstructorIngredient = {
  ...ingredientBun,
  id: ingredientBun._id
};

export const ingredientMain: TIngredient = {
  calories: 6,
  carbohydrates: 3,
  fat: 2,
  image: 'https://code.s3.yandex.net/react/code/salad.png',
  image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
  name: 'Мини-салат Экзо-Плантаго',
  price: 4400,
  proteins: 1,
  type: 'main',
  _id: '643d69a5c3f7b9001cfa0949'
};

export const constructorIngredientMain: TConstructorIngredient = {
  ...ingredientMain,
  id: ingredientMain._id
};

export const ingredientSauce: TIngredient = {
  calories: 99,
  carbohydrates: 42,
  fat: 24,
  name: 'Соус традиционный галактический',
  price: 15,
  proteins: 42,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  type: 'sauce',
  _id: '643d69a5c3f7b9001cfa0944'
};

export const constructorIngredientSauce: TConstructorIngredient = {
  ...ingredientSauce,
  id: ingredientSauce._id
};

export const requestId = 'requestId';
export const errorMessage = 'Ошибка загрузки';

export const order1: TOrder = {
  createdAt: '2024-12-18T18:48:24.978Z',
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa0941',
    '643d69a5c3f7b9001cfa0940'
  ],
  name: 'Краторный био-марсианский метеоритный бургер',
  number: 63251,
  status: 'done',
  updatedAt: '2024-12-18T18:48:25.961Z',
  _id: '676318f8750864001d3726a9'
};

export const order2: TOrder = {
  createdAt: '2024-12-18T18:55:23.971Z',
  ingredients: [
    '643d69a5c3f7b9001cfa093e',
    '643d69a5c3f7b9001cfa093d',
    '643d69a5c3f7b9001cfa093d'
  ],
  name: 'Флюоресцентный люминесцентный бургер',
  number: 63264,
  status: 'done',
  updatedAt: '2024-12-18T18:55:24.954Z',
  _id: '67631a9b750864001d3726ba'
};

export const order3: TOrder = {
  createdAt: '2024-12-18T19:13:40.124Z',
  ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0941'],
  name: 'Флюоресцентный био-марсианский бургер',
  number: 63280,
  status: 'done',
  updatedAt: '2024-12-18T19:13:40.913Z',
  _id: '67631ee4750864001d3726e0'
};

export const mockOrders: TOrder[] = [order1, order2, order3];

export const mockFeedResponse: TFeedsResponse = {
  orders: mockOrders,
  total: 123,
  totalToday: 50,
  success: true
};

export const mockOrderResponse: TOrderResponse = {
  orders: [order1],
  success: true
};

export const mockNewOrderResponse: TNewOrderResponse = {
  name: 'Флюоресцентный люминесцентный био-марсианский бургер',
  order: order1,
  success: true
};

export const mockIngredientsIds: string[] = [
  constructorIngredientBun.id,
  constructorIngredientMain.id,
  constructorIngredientSauce.id
];

export const mockUser: TUser = {
  name: 'Иван',
  email: 'testUser@example.com'
};

export const mockAuthResponse: TAuthResponse = {
  accessToken: 'Bearer%eyJhbGciOiJIUzI',
  refreshToken: 'afdd6e9eefb19e6c60e8c',
  user: mockUser,
  success: true
};

export const mockUserResponse: TUserResponse = {
  user: mockUser,
  success: true
};

export const mockRegisterData: TRegisterData = {
  email: 'testUser@example.com',
  password: '12345678',
  name: 'Иван'
};

export const mockLoginData: TLoginData = {
  email: 'testUser@example.com',
  password: '12345678'
};

export const mockResetPasswordData = {
  password: '12345678',
  token: 'Bearer%eyJhbGciOiJIUzI'
};

export const mockForgotPasswordData = {
  email: 'testUser@example.com'
};
