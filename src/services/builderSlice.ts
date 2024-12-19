import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '../utils/types';

type TBuilderState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TBuilderState = {
  bun: null,
  ingredients: []
};

export const builderSlice = createSlice({
  name: 'builder',
  initialState,
  selectors: {
    selectBuilder: (state) => state
  },
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      const { payload } = action;

      if (payload.type === 'bun') {
        state.bun = { ...payload, id: payload._id };
      } else {
        state.ingredients.push({ ...payload, id: payload._id });
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      const { payload: id } = action;
      state.ingredients = state.ingredients.filter((item) => item.id !== id);
    },
    clearBuilder: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0 && index < state.ingredients.length) {
        const ingredient = state.ingredients[index];
        state.ingredients.splice(index, 1);
        state.ingredients.splice(index - 1, 0, ingredient);
      }
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index >= 0 && index < state.ingredients.length - 1) {
        const ingredient = state.ingredients[index];
        state.ingredients.splice(index, 1);
        state.ingredients.splice(index + 1, 0, ingredient);
      }
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  clearBuilder,
  moveIngredientUp,
  moveIngredientDown
} = builderSlice.actions;

export const { selectBuilder } = builderSlice.selectors;

export default builderSlice.reducer;
