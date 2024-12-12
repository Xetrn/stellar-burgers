import {
  createAsyncThunk,
  createSelector,
  createSlice
} from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  getIngredientsApi
);

type TIngredientsState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | undefined | null;
};

const initialState: TIngredientsState = {
  ingredients: [],
  loading: true,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (state) => state.ingredients,
    getIngredientsLoading: (state) => state.loading,
    getIngredientsError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { getIngredients, getIngredientsLoading, getIngredientsError } =
  ingredientsSlice.selectors;

export const getBunsIngredients = createSelector(
  getIngredients,
  (ingredients) => ingredients.filter((i) => i.type === 'bun')
);

export const getMainsIngredients = createSelector(
  getIngredients,
  (ingredients) => ingredients.filter((i) => i.type === 'main')
);

export const getSaucesIngredients = createSelector(
  getIngredients,
  (ingredients) => ingredients.filter((i) => i.type === 'sauce')
);

export const getIngredientById = (id: string) =>
  createSelector(
    getIngredients,
    (ingredients) => ingredients.find((i) => i._id === id) ?? null
  );
