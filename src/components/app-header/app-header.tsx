import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { selectUserName } from '../../services/slices/userSlice';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const name = useSelector(selectUserName);
  return <AppHeaderUI userName={name} />;
};
