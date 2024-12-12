import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logout } from '../../services/user-slice/actions';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    console.log(pathname);
    nav('/');
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
