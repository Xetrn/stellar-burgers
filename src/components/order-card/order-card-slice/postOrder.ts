import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';

export const postOrder = createAsyncThunk(
  'order-card-slice/post-order',
  async (ingredients: string[]) => orderBurgerApi(ingredients)
);
