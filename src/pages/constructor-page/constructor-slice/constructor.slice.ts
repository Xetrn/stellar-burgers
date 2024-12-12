import { TConstructorIngredient } from '@utils-types';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    },
    resetSelect: (store) => {
      store.bun = BunInitial;
      store.ingredients = [];
    },
    removeIngredient: (store, action: PayloadAction<string>) => {
      store.ingredients = store.ingredients.filter(
        (item) => item._id !== action.payload
      );
    },
    moveIngredient: (
      store,
      action: PayloadAction<{ newIndex: number; index: number }>
    ) => {
      const temp = store.ingredients[action.payload.newIndex];
      store.ingredients[action.payload.newIndex] =
        store.ingredients[action.payload.index];
      store.ingredients[action.payload.index] = temp;
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

export const { addIngredient, resetSelect, removeIngredient, moveIngredient } =
  ConstructorSlice.actions;
export const { selectConstructorItems } = ConstructorSlice.selectors;

export default ConstructorSlice.reducer;
