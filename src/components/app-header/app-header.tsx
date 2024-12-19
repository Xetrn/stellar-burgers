import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { Outlet } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectUser } from '../../services/user-slice/user.slice';

export const AppHeader: FC = () => {
  const { name } = useSelector(selectUser);
  return (
    <>
      <AppHeaderUI userName={name} /> <Outlet />
    </>
  );
};
