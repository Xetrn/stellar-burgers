import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { loginUserApi, TLoginData } from '@api';
import { useDispatch } from 'react-redux';
import { setUser } from '@slices';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../../utils/cookie';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const userData: TLoginData = {
      email,
      password
    };
    const login = loginUserApi(userData);
    login
      .then((res) => {
        setCookie('accessToken', res.accessToken);
        setCookie('refreshToken', res.refreshToken);

        dispatch(setUser(res.user));
        navigate('/profile');
      })
      .catch((err) => alert(err));
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
