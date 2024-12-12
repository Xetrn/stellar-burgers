import { useDispatch, useSelector } from '../../services/store';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC, useEffect } from 'react';
import { selectLoading } from '../../components/burger-ingredients/ingredients-slice/ingredients.slice';
import { getIngredients } from '../../components/burger-ingredients/ingredients-slice/getIngredients';
import { getUser } from '../../services/user-slice/actions';

export const ConstructorPage: FC = () => {
  const isIngredientsLoading = useSelector(selectLoading);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!isIngredientsLoading) {
      dispatch(getUser());
      dispatch(getIngredients());
    }
  }, []);

  return (
    <>
      {isIngredientsLoading ? (
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
        </main>
      )}
    </>
  );
};
