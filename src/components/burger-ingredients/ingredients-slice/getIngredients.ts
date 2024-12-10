import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

export const getIngredients = createAsyncThunk(
  'ingredients-slice/getAllIngredients',
  async () => getIngredientsApi()
);
