import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IngredientType } from '../../const';

interface TIngredientState {
  ingredientsData: Array<TIngredient>;
  ingredientsError: string | null | undefined;
  isIngredientsLoading: boolean;
}

const initialState: TIngredientState = {
  ingredientsData: [],
  ingredientsError: null,
  isIngredientsLoading: false
};

export const fetchIngredients = createAsyncThunk(
  'ingredient/fetchIngredients',
  getIngredientsApi
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsData: (store) => store.ingredientsData,
    getIngredientById: (store) => (id: string) =>
      store.ingredientsData.find((ingredient) => ingredient._id === id),
    getBunIngredientsData: (store) =>
      store.ingredientsData.filter(
        (ingredient) => ingredient.type === IngredientType.BUN
      ),
    getMainIngredientsData: (store) =>
      store.ingredientsData.filter(
        (ingredient) => ingredient.type === IngredientType.MAIN
      ),
    getSauceIngredientsData: (store) =>
      store.ingredientsData.filter(
        (ingredient) => ingredient.type === IngredientType.SAUCE
      ),
    getIngredientsError: (store) => store.ingredientsError,
    getIngredientsLoading: (store) => store.isIngredientsLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
        state.ingredientsError = null;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredientsError = action.error.message;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredientsData = action.payload;
        state.isIngredientsLoading = false;
      });
  }
});

export const {
  getIngredientsData,
  getIngredientById,
  getBunIngredientsData,
  getMainIngredientsData,
  getSauceIngredientsData,
  getIngredientsError,
  getIngredientsLoading
} = ingredientsSlice.selectors;
