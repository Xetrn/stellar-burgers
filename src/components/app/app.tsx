import '../../index.css';
import styles from './app.module.css';
import { AppHeader } from '@components';
import { useEffect } from 'react';
import { checkUser } from '../../services/slices/userSlice';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { useDispatch } from '../../services/store';
import AppRoutes from '../../services/AppRoutes';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUser());
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <AppRoutes />
    </div>
  );
};

export default App;
