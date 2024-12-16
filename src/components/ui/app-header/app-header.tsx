import React, { FC } from 'react';
import clsx from 'clsx';
import { NavLink, useLocation } from 'react-router-dom';
import { AppRoute } from '../../../const';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation();

  const isActiveLink = (path: string) => location.pathname.startsWith(path);

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink
            to={AppRoute.ConstructorPage}
            className={() =>
              clsx(
                styles.link,
                isActiveLink(AppRoute.ConstructorPage) && styles.link_active
              )
            }
            end
          >
            <BurgerIcon type='primary' />
            <p className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </p>
          </NavLink>
          <NavLink
            to={AppRoute.Feed}
            className={() =>
              clsx(
                styles.link,
                isActiveLink(AppRoute.Feed) && styles.link_active
              )
            }
          >
            <ListIcon type='primary' />
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </NavLink>
        </div>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
        <div className={styles.link_position_last}>
          <NavLink
            to={AppRoute.Profile}
            className={() =>
              clsx(
                styles.link,
                isActiveLink(AppRoute.Profile) && styles.link_active
              )
            }
          >
            <ProfileIcon type='primary' />
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
