export const userMock = {
  name: 'test',
  email: 'test@test.ru',
  password: 'test'
};

export const userUpdateMock = {
  name: 'qwerty',
  email: 'qwerty@qwerty.ru',
  password: 'qwerty'
};

export const error = 'Ошибка запроса';

export const initialUserState = {
  isAuthorized: false,
  user: {
    name: '',
    email: ''
  },
  error: null,
  loading: false
};

export const userLogoutState = {
  isAuthorized: true,
  user: {
    name: 'test',
    email: 'test@test.ru'
  },
  error: null,
  loading: false
};
