import { getOrderByNumberApi, getOrdersApi } from '../../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrdersState = {
  orders: TOrder[];
  orderData: TOrder;
  isLoading: boolean;
  orderModalRequest: boolean;
  error: string | null;
};

export const initialState: TOrdersState = {
  orders: [],
  orderData: {
    _id: '',
    ingredients: [],
    status: '',
    name: '',
    createdAt: '',
    updatedAt: '',
    number: 0
  },
  isLoading: false,
  orderModalRequest: false,
  error: null
};

export const fetchOrders = createAsyncThunk<TOrder[]>(
  'orders/fetchOrders',
  async () => await getOrdersApi()
);

export const fetchOrder = createAsyncThunk(
  'order/fetchOrderByNumber',
  async (number: number) => {
    const order = await getOrderByNumberApi(number);
    return order.orders;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    selectOrders: (state) => state.orders,
    selectOrderData: (state) => state.orderData,
    selectIsLoading: (state) => state.isLoading,
    selectOrderModalRequest: (state) => state.orderModalRequest,
    selectError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orderModalRequest = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.orderModalRequest = false;
        state.error = action.error.message as string;
      })
      .addCase(fetchOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orderData = action.payload[0];
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });
  }
});

export const {
  selectOrders,
  selectOrderData,
  selectIsLoading,
  selectOrderModalRequest,
  selectError
} = orderSlice.selectors;

export default orderSlice.reducer;
