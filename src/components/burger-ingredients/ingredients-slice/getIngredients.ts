import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

export const getIngredients = createAsyncThunk(
  'ingredients.ts-slice/getAllIngredients',
  async () => getIngredientsApi()
);
