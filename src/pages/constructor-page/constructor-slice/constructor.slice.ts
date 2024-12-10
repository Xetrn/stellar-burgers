import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';
import { BunInitial, TBun } from '../../../services/types';

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
      if (!store.ingredients.find((item) => item._id === action.payload._id)) {
        store.ingredients.push(action.payload);
      }
    }
  },
  selectors: {
    selectBun: (state: TConstructor) => state.bun,
    selectIngredients: (state: TConstructor) => state.ingredients,
    selectConstructorItems: createSelector(
      (state) => state.bun,
      (state) => state.ingredients,
      (bun, ingredients) => ({
        bun,
        ingredients
      })
    )
  }
});

export const { addIngredient } = ConstructorSlice.actions;
export const { selectConstructorItems } = ConstructorSlice.selectors;

export default ConstructorSlice.reducer;
