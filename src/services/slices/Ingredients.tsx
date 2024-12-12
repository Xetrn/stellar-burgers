import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import {
  onFulfilledGetIngredientsList,
  onPendingGetIngredientsList,
  onRejectedGetIngredientsList
} from '../reducers/ingredients';

export const getIngredientsList = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

export type TIngredientsState = {
  isLoadingGetIngredients: boolean;
  ingredients: Array<TIngredient>;
  error: string | null | undefined;
};

const initialState: TIngredientsState = {
  isLoadingGetIngredients: false,
  ingredients: [],
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsState: (state) => state,
    getIsLoadingIngredients: (state) => state.isLoadingGetIngredients,
    getIngredients: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsList.pending, onPendingGetIngredientsList)
      .addCase(getIngredientsList.fulfilled, onFulfilledGetIngredientsList)
      .addCase(getIngredientsList.rejected, onRejectedGetIngredientsList);
  }
});

export const { getIngredientsState, getIsLoadingIngredients, getIngredients } =
  ingredientsSlice.selectors;
