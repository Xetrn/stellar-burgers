import { TConstructorIngredient, TIngredient } from '@utils-types';

export type TPendingProps = {
  error: string | null;
  loading: boolean;
};

export type TConstructorItems = {
  bun: TBun;
  ingredients: TConstructorIngredient[];
};

export type TBun = {
  _id: string;
  name: string;
  price: number;
  image: string;
};

export const BunInitial: TBun = {
  _id: '',
  name: '',
  price: 0,
  image: ''
};
