import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'constructorIngredients',
  initialState,
  selectors: {
    getConstructor: (state) => state
  },
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TConstructorIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
    },
    deleteIngredientById: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (i) => i.id !== action.payload
      );
    },
    setIngredients: (
      state,
      action: PayloadAction<TConstructorIngredient[]>
    ) => {
      state.ingredients = action.payload;
    },
    moveIngredientUp: (state, action: PayloadAction<string>) => {
      const idx = state.ingredients.findIndex((i) => i.id === action.payload);
      if (idx > 0) {
        const temp = state.ingredients[idx];
        state.ingredients[idx] = state.ingredients[idx - 1];
        state.ingredients[idx - 1] = temp;
      }
    },
    moveIngredientDown: (state, action: PayloadAction<string>) => {
      const idx = state.ingredients.findIndex((i) => i.id === action.payload);
      if (idx < state.ingredients.length - 1) {
        const temp = state.ingredients[idx];
        state.ingredients[idx] = state.ingredients[idx + 1];
        state.ingredients[idx + 1] = temp;
      }
    },
    resetConstructor: () => initialState
  }
});

export const {
  addIngredient,
  deleteIngredientById,
  setIngredients,
  moveIngredientUp,
  moveIngredientDown,
  resetConstructor
} = constructorSlice.actions;

export const { getConstructor } = constructorSlice.selectors;
