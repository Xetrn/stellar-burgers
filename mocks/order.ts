export const orderMock = [
  '643d69a5c3f7b9001cfa093c',
  '643d69a5c3f7b9001cfa093f',
  '643d69a5c3f7b9001cfa0945',
  '643d69a5c3f7b9001cfa093c'
];

export const modalOrderMock = {
  _id: '675b2190750864001d370e2e',
  ingredients: orderMock,
  status: 'done',
  name: 'Флюоресцентный бургер',
  createdAt: '2024-12-12T17:46:56.781Z',
  updatedAt: '2024-12-12T17:46:57.741Z',
  number: 62639
};

export const orderCreatedResponseMock = {
  name: 'Флюоресцентный бургер',
  success: true,
  order: modalOrderMock
};

export const orderFetchedResponseMock = {
  success: true,
  orders: [modalOrderMock]
};

export const initialOrderState = {
  orderModalData: null,
  orderRequest: false,
  error: null
};

export const error = 'Ошибка запроса';
