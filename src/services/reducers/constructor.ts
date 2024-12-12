import { PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';
import { TConstructorState } from '../slices/constructor';

export const addItemReducer = (
  state: TConstructorState,
  action: PayloadAction<TConstructorIngredient>
) => {
  if (action.payload.type === 'bun') {
    state.bun = action.payload;
  } else {
    state.ingredients.push(action.payload);
  }
};

export const deleteItemReducer = (
  state: TConstructorState,
  action: PayloadAction<TConstructorIngredient>
) => {
  state.ingredients = state.ingredients.filter(
    (item) => item.id !== action.payload.id
  );
};

export const updateAllReducer = (
  state: TConstructorState,
  action: PayloadAction<TConstructorIngredient[]>
) => {
  state.ingredients = action.payload;
};
