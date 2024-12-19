export const myOrdersMock = {
  success: true,
  orders: [
    {
      _id: '675b1bec750864001d370dfa',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa0947',
        '643d69a5c3f7b9001cfa0949',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0949',
        '643d69a5c3f7b9001cfa0949',
        '643d69a5c3f7b9001cfa0943'
      ],
      status: 'done',
      name: 'Флюоресцентный space фалленианский био-марсианский минеральный экзо-плантаго люминесцентный бургер',
      createdAt: '2024-12-12T17:22:52.570Z',
      updatedAt: '2024-12-12T17:22:53.498Z',
      number: 62630
    },
    {
      _id: '675b2190750864001d370e2e',
      ingredients: ['643d69a5c3f7b9001cfa093d'],
      status: 'done',
      name: 'Флюоресцентный бургер',
      createdAt: '2024-12-12T17:46:56.781Z',
      updatedAt: '2024-12-12T17:46:57.741Z',
      number: 62639
    },
    {
      _id: '675b25f6750864001d370e42',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0941'
      ],
      status: 'done',
      name: 'Флюоресцентный био-марсианский метеоритный бургер',
      createdAt: '2024-12-12T18:05:42.412Z',
      updatedAt: '2024-12-12T18:05:43.415Z',
      number: 62642
    },
    {
      _id: '675b2b32750864001d370e5b',
      ingredients: ['643d69a5c3f7b9001cfa093d'],
      status: 'done',
      name: 'Флюоресцентный бургер',
      createdAt: '2024-12-12T18:28:02.879Z',
      updatedAt: '2024-12-12T18:28:03.554Z',
      number: 62648
    },
    {
      _id: '675b2d0c750864001d370e64',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
      status: 'done',
      name: 'Флюоресцентный бургер',
      createdAt: '2024-12-12T18:35:56.533Z',
      updatedAt: '2024-12-12T18:35:57.529Z',
      number: 62650
    },
    {
      _id: '67644752750864001d372caa',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa0945',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный бессмертный антарианский бургер',
      createdAt: '2024-12-19T16:18:26.860Z',
      updatedAt: '2024-12-19T16:18:27.804Z',
      number: 63472
    }
  ]
};

export const myOrdersState = {
  orders: myOrdersMock.orders,
  loading: false,
  error: null
};

export const error = 'Ошибка запроса';

export const initialMyOrdersState = {
  orders: [],
  loading: true,
  error: null
};
