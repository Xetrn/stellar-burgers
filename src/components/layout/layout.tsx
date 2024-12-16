import { AppHeader } from '@components';
import styles from './layout.module.css';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { Preloader } from '@ui';

interface ILayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: ILayoutProps) => (
  <div className={styles.app}>
    <AppHeader />
    {children}
    <Outlet />
  </div>
);
