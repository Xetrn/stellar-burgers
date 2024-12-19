import { useSelector } from 'react-redux';
import React, { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { getName } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const userName = useSelector(getName);
  return <AppHeaderUI userName={userName} />;
};
