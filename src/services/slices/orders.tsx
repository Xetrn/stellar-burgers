import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

import { getOrdersApi } from '@api';

export const getOrders = createAsyncThunk('orders/all', getOrdersApi);

type OrdersState = {
    orders: TOrder[];
    isLoading: boolean;
    isError: boolean;
};

const initialState: OrdersState = {
    orders: [],
    isLoading: false,
    isError: false
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.orders = action.payload;
            })
            .addCase(getOrders.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    }
});

export const ordersReducer = ordersSlice.reducer;
