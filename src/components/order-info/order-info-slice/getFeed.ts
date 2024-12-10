import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';

export const getFeed = createAsyncThunk(
  'order-info-slice/getAllFeed',
  async () => getFeedsApi()
);
