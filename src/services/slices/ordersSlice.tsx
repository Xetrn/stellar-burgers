import { createSlice } from "@reduxjs/toolkit"
import { TOrder } from "@utils-types"
import { getOrders } from "../thunks"


export type OrdersData = {
    orders: TOrder[],
    isOrdersRequest: boolean,
    isOrdersError: boolean,
    ordersError: string
}

const initialState: OrdersData = {
    orders: [],
    isOrdersRequest: false,
    isOrdersError: false,
    ordersError: ""
}

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        clearOrders: (state) => {
            state.orders = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getOrders.pending, (state) => {
            state.isOrdersRequest = true;
            state.isOrdersError = false;
        })
        .addCase(getOrders.fulfilled, (state, action) => {
            state.isOrdersRequest = false;
            state.orders = action.payload;
        })
        .addCase(getOrders.rejected, (state, action) => {
            state.isOrdersError = true;
            state.ordersError = action.error.message ?? "Неизвестная ошибка";
        })
    }
})

export const { clearOrders } = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;