import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser } from '../../services/user-slice/actions';
import {
  selectLoginUserError,
  selectLoginUserRequest
} from '../../services/user-slice/user.slice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector(selectLoginUserError);

  const dispatch = useDispatch();
  const isUserRequest = useSelector(selectLoginUserRequest);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (isUserRequest) {
      return;
    }
    dispatch(loginUser({ email, password }));
  };

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
