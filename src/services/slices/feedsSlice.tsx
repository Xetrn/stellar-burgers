import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOrder, TOrdersData } from "@utils-types";
import { getFeeds } from "../thunks";

export type FeedsData = TOrdersData & {
    isFeedsLoading: boolean,
    isFeedsError: boolean,
}

const initialState: FeedsData = {
    isFeedsLoading: false,
    isFeedsError: false,
    orders: [],
    total: 0,
    totalToday: 0
};

const feedsSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getFeeds.pending, (state) => {
            state.isFeedsLoading = true;
        })
        .addCase(getFeeds.fulfilled, (state, action) => {
            const feedsActualData = action.payload;
            state.orders = feedsActualData.orders;
            state.total = feedsActualData.total;
            state.totalToday = feedsActualData.totalToday;
            state.isFeedsLoading = false;
        })
        .addCase(getFeeds.rejected, (state) => {
            state.isFeedsError = true;
            state.isFeedsLoading = false;
        })
    }
})

export const feedsReducer = feedsSlice.reducer;