import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';

import { getFeedsApi } from '@api';

export const getFeeds = createAsyncThunk('feeds/getAll', getFeedsApi);

type FeedsState = TOrdersData & {
    isLoading: boolean;
    isError: boolean;
};

export const initialState: FeedsState = {
    isLoading: false,
    isError: false,
    orders: [],
    total: 0,
    totalToday: 0
};

const feedsSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFeeds.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFeeds.fulfilled, (state, action) => {
                state.orders = action.payload.orders;
                state.total = action.payload.total;
                state.totalToday = action.payload.totalToday;

                state.isLoading = false;
            })
            .addCase(getFeeds.rejected, (state) => {
                state.isError = true;
                state.isLoading = false;
            });
    }
});

export const feedsReducer = feedsSlice.reducer;
