import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '@api';

export const getOrderById = createAsyncThunk(
  'feed-slice/getSingleOrder',
  async (id: number) => getOrderByNumberApi(id)
);
