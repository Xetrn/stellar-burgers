import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

import { v4 as uuidv4, v4 } from 'uuid';

export interface IConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

export const initialState: IConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        switch (action.payload.type) {
          case 'bun':
            state.bun = action.payload;
            break;
          default:
            state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredients: TIngredient) => ({
        payload: { ...ingredients, id: v4() }
      })
    },

    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    clearIngredients: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    getBurger: (state) => state,
    getIngredients: (state) => state.ingredients,
    getAllIngredients: createSelector(
      (state) => state,
      (state) => {
        const { bun, ingredients } = state;
        const bunArray = bun ? [bun] : [];
        return [...bunArray, ...ingredients];
      }
    )
  }
});

export const { getBurger, getIngredients, getAllIngredients } =
  constructorSlice.selectors;
export const { addIngredient, removeIngredient, clearIngredients } =
  constructorSlice.actions;

export default constructorSlice.reducer;
