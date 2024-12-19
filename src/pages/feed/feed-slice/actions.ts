import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi, getOrdersApi } from '@api';

export const getFeed = createAsyncThunk('feed-slice/getAllFeed', async () =>
  getFeedsApi()
);

export const getOrderById = createAsyncThunk(
  'feed-slice/getSingleOrder',
  async (id: number) => getOrderByNumberApi(id)
);

export const getUserOrders = createAsyncThunk(
  'feed-slice/userOrders',
  async () => getOrdersApi()
);
