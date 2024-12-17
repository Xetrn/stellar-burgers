import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../src/services/thunks';
import { AppDispatch } from '../../../src/services/store';
import { clearOrders } from '../../../src/services/slices/ordersSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(clearOrders());
  }

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
