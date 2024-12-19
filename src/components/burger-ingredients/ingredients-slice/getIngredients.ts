import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

export const getIngredients = createAsyncThunk(
  'ingredientsSlice/getAllIngredients',
  async () => getIngredientsApi()
);
