import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { userLogin, IUserSlice } from '../../services/slices/userSlice';
import { Preloader } from '@ui';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { error, isLoading } = useSelector(
    (state: { user: IUserSlice }) => state.user
  );

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await dispatch(userLogin({ email, password })).unwrap();
    } catch (err: any) {
      console.error(err?.message || 'Ошибка входа');
    }
  };

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <LoginUI
          errorText={error || ''}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};
