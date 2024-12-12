import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { RootState } from 'src/services/store';
import { useSelector } from 'react-redux';

export const AppHeader: FC = () => {
  const user = useSelector((state: RootState) => state.user.data);
  return <AppHeaderUI userName={user?.name || ''} />;
};
