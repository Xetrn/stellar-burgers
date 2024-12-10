import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';

export const getFeed = createAsyncThunk('feed-slice/getAllFeed', async () =>
  getFeedsApi()
);
