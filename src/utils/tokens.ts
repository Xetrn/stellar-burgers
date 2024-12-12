import { deleteCookie, setCookie } from './cookie';

type Tokens = { accessToken: string; refreshToken: string };

export const saveTokens = ({ accessToken, refreshToken }: Tokens) => {
  setCookie('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const deleteTokens = () => {
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
};
