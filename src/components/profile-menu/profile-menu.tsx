import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { logoutApi } from '../../utils/burger-api';
import { clearUserData } from '../../services/slices/userSlice';
import { ProfileMenuUI } from '@ui';
import { deleteCookie } from '../../utils/cookie';

export const ProfileMenu: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutApi();

      localStorage.removeItem('refreshToken');
      deleteCookie('accessToken');

      dispatch(clearUserData());

      navigate('/login', { state: { from: location.pathname } });
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  return (
    <ProfileMenuUI
      handleLogout={handleLogout}
      pathname={useLocation().pathname}
    />
  );
};
