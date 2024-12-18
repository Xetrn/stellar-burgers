import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { AppRouter } from '../../router/AppRouter';
import { getUserRequest } from '../../services/slices/user';
import { getIngredientsList } from '../../services/slices/Ingredients';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsList());
    dispatch(getUserRequest());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <AppRouter />
    </div>
  );
};

export default App;
