import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BunInitial, TBun, TConstructorItems } from '../../../services/types';

type TConstructor = {
  bun: TBun;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructor = {
  bun: BunInitial,
  ingredients: []
};

export const ConstructorSlice = createSlice({
  name: 'constructorSlice',
  initialState,
  selectors: {
    selectConstructorItems: (state: TConstructor) => ({
      bun: state.bun,
      ingredients: state.ingredients
    }),
    selectBurgerConstructor: (state: TConstructor) => ({
      bun: state.bun,
      ingredients: state.ingredients
    })
  },
  reducers: {
    addIngredient: (store, action: PayloadAction<TConstructorIngredient>) => {
      if (action.payload.type === 'bun') {
        store.bun = {
          _id: action.payload._id,
          price: action.payload.price,
          name: action.payload.name,
          image: action.payload.image
        };
        return;
      }
      if (store.ingredients.find((item) => item._id === action.payload._id)) {
        console.log(1);
      }
      store.ingredients.push(action.payload);
    }
    // confirmOrder: (store) => {
    //
    // }
  }
});
export const { selectConstructorItems, selectBurgerConstructor } =
  ConstructorSlice.selectors;

export const { addIngredient } = ConstructorSlice.actions;
