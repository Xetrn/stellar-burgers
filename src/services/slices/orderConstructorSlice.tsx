import { TConstructorIngredient } from '@utils-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export type TOrderConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TOrderConstructorState = {
  bun: null,
  ingredients: []
};

export const orderConstructorSlice = createSlice({
  name: 'orderConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TConstructorIngredient) => {
        const id = uuidv4();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    resetConstructor: (state) => (state = initialState),
    updateConstructor: (
      state,
      action: PayloadAction<TConstructorIngredient[]>
    ) => {
      state.ingredients = action.payload;
    }
  },
  selectors: {
    selectItems: (state: TOrderConstructorState) => state
  }
});

export const {
  addIngredient,
  removeIngredient,
  resetConstructor,
  updateConstructor
} = orderConstructorSlice.actions;

export const constructorSelector = orderConstructorSlice.selectors;
