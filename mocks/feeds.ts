export const mockOrders = {
  success: true,
  orders: [
    {
      _id: '67646405750864001d372d4a',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Space флюоресцентный spicy бургер',
      createdAt: '2024-12-19T18:20:53.411Z',
      updatedAt: '2024-12-19T18:20:54.439Z',
      number: 63499
    },
    {
      _id: '67645dcd750864001d372d3d',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Space флюоресцентный бургер',
      createdAt: '2024-12-19T17:54:21.797Z',
      updatedAt: '2024-12-19T17:54:24.903Z',
      number: 63498
    },
    {
      _id: '67645dcd750864001d372d3c',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный метеоритный бургер',
      createdAt: '2024-12-19T17:54:21.452Z',
      updatedAt: '2024-12-19T17:54:23.114Z',
      number: 63497
    },
    {
      _id: '67645d9d750864001d372d38',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Space флюоресцентный бургер',
      createdAt: '2024-12-19T17:53:33.306Z',
      updatedAt: '2024-12-19T17:53:34.225Z',
      number: 63496
    },
    {
      _id: '67645d81750864001d372d37',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Space флюоресцентный бургер',
      createdAt: '2024-12-19T17:53:05.276Z',
      updatedAt: '2024-12-19T17:53:06.117Z',
      number: 63495
    }
  ],
  total: 5,
  totalToday: 2
};

export const error = 'Ошибка запроса';

export const initialFeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: true,
  error: null
};

export const feedsState = {
  orders: mockOrders.orders,
  total: mockOrders.total,
  totalToday: mockOrders.totalToday,
  loading: false,
  error: null
};
