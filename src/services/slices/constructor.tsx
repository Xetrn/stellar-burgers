import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';
import { v4 as uuid } from 'uuid';
import {
  addItemReducer,
  deleteItemReducer,
  updateAllReducer
} from '../reducers/constructor';

export type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'constructorIngredient',
  initialState,
  reducers: {
    addItemToConstructor: {
      reducer: addItemReducer,
      prepare: (ingredient: TConstructorIngredient) => {
        const id = uuid();
        return { payload: { ...ingredient, id } };
      }
    },
    deleteItemFromConstructor: deleteItemReducer,
    clearConstructor: () => initialState,
    updateConstructor: updateAllReducer
  },
  selectors: {
    getConstructorItems: (state: TConstructorState) => state
  }
});

export const {
  addItemToConstructor,
  deleteItemFromConstructor,
  clearConstructor,
  updateConstructor
} = constructorSlice.actions;

export const { getConstructorItems } = constructorSlice.selectors;
