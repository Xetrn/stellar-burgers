import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { registerUserApi, TRegisterData } from '@api';
import { useDispatch } from 'react-redux';
import { setUser } from '@slices';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../../utils/cookie';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const userData: TRegisterData = {
      email,
      name: userName,
      password
    };

    const register = registerUserApi(userData);
    register
      .then((res) => {
        if (res.success) {
          setCookie('accessToken', res.accessToken);
          setCookie('refreshToken', res.refreshToken);
          dispatch(setUser(res.user));
          navigate('/login');
        }
      })
      .catch((err) => alert(err.message));
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
