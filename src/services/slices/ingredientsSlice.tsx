import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const getIngredientsList = createAsyncThunk(
  'ingredients/fetchList',
  getIngredientsApi
);

type TIngredientsState = {
  ingredientsList: TIngredient[];
  loading: boolean;
  error: string | null | undefined;
};

const initialState: TIngredientsState = {
  ingredientsList: [],
  loading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    isLoadingSelector: (state) => state.loading,
    ingredientsStateSelector: (state) => state,
    ingredientsSelector: (state) => state.ingredientsList
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsList.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message;
      })
      .addCase(getIngredientsList.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredientsList = action.payload;
      })
      .addCase(getIngredientsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  }
});

export const {
  ingredientsStateSelector,
  isLoadingSelector,
  ingredientsSelector
} = ingredientsSlice.selectors;
export const ingredientsSliceReducer = ingredientsSlice.reducer;
