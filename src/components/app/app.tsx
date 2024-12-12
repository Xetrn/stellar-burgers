import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { fetchIngredients, fetchUser } from '@slices';
import { AppRoutes, ModalRoutes } from './router';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchUser());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <AppRoutes />
      <ModalRoutes />
    </div>
  );
};

export default App;
