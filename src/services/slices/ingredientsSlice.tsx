import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getIngredientsList = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

type TIngredientsState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  errorMessage: string | null | undefined;
};

const initialState: TIngredientsState = {
  ingredients: [],
  isLoading: false,
  errorMessage: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectLoadingState: (state) => state.isLoading,
    selectIngredientsState: (state) => state,
    selectIngredientItems: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsList.rejected, (state, action) => {
        state.isLoading = true;
        state.errorMessage = action.error.message;
      })
      .addCase(getIngredientsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredientsList.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      });
  }
});

export const {
  selectIngredientsState,
  selectLoadingState,
  selectIngredientItems
} = ingredientsSlice.selectors;
