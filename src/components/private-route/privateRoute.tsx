import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../services/store';
import { getCookie } from '../../utils/cookie';
import { useEffect, useState } from 'react';
import {
  fetchUser,
  logoutUser,
  refreshUserToken,
  setUserLoading
} from '@slices';
import { Preloader } from '@ui';

interface IPrivateRouteProps {
  children: React.ReactNode;
  link: string;
  onlyUnAuth?: boolean;
}

export const PrivateRoute = ({
  children,
  onlyUnAuth,
  link
}: IPrivateRouteProps) => {
  const { isAuth, isLoading } = useSelector((state: RootState) => state.user);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');
    dispatch(setUserLoading(true));

    const initializeUser = async () => {
      dispatch(setUserLoading(true));
      try {
        if (accessToken) {
          // Если есть accessToken, загружаем пользователя
          await dispatch(fetchUser()).unwrap();
        } else if (refreshToken) {
          // Если есть только refreshToken, обновляем токены и загружаем пользователя
          await dispatch(refreshUserToken()).unwrap();
          await dispatch(fetchUser()).unwrap();
        }
      } catch (err) {
        console.error('Ошибка при инициализации пользователя:', err);
        dispatch(logoutUser());
      } finally {
        dispatch(setUserLoading(false));
        setIsInitialized(true); // Устанавливаем, что инициализация завершена
      }
    };

    initializeUser();
    dispatch(setUserLoading(false));
  }, [dispatch, isAuth]);

  if (isLoading || !isInitialized) {
    return <Preloader />; // Показываем прелоадер, пока идет загрузка или инициализация
  }

  if (onlyUnAuth) {
    return !isAuth ? <>{children}</> : <Navigate to={link} />;
  }

  return isAuth ? <>{children}</> : <Navigate to={link} />;
};
