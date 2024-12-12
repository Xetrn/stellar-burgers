import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  IngredientType,
  selectBuns,
  selectMains,
  selectSauces
} from '../../services/slices/ingredientsSlice';
import { useSelector } from '../../services/store';
import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';

export const BurgerIngredients: FC = () => {
  /** TODO: взять переменные из стора */
  const buns = useSelector(selectBuns);
  const mains = useSelector(selectMains);
  const sauces = useSelector(selectSauces);

  const [currentTab, setCurrentTab] = useState<TTabMode>(IngredientType.BUN);
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab(IngredientType.BUN);
    } else if (inViewSauces) {
      setCurrentTab(IngredientType.SAUCE);
    } else if (inViewFilling) {
      setCurrentTab(IngredientType.MAIN);
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === IngredientType.BUN)
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === IngredientType.MAIN)
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === IngredientType.SAUCE)
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
