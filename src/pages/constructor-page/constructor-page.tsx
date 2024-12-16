import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/services/store';
import { getIngredientsApi } from '@api';
import { setIngredients, setIngredientsLoading } from '@slices';
import { Outlet } from 'react-router-dom';

export const ConstructorPage: FC = () => {
  const isLoading: boolean = useSelector(
    (state: RootState) => state.ingredients.isLoading
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchIngredients = async () => {
      dispatch(setIngredientsLoading(true));
      const ingredients = await getIngredientsApi();
      dispatch(setIngredients(ingredients));
      dispatch(setIngredientsLoading(false));
    };

    fetchIngredients();
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
          <Outlet />
        </main>
      )}
    </>
  );
};
