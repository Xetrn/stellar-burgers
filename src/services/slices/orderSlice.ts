import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { getOrderByNumberApi, orderBurgerApi } from '../../utils/burger-api';

type TOrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  orderError: string | null;
  orderData: TOrder[];
};

const initialOrderState: TOrderState = {
  orderRequest: false,
  orderModalData: null,
  orderError: null,
  orderData: []
};

export const fetchOrderByNumber = createAsyncThunk<
  TOrder,
  number,
  { rejectValue: string }
>('order/fetchOrderByNumber', async (orderNumber, { rejectWithValue }) => {
  try {
    const response = await getOrderByNumberApi(orderNumber);
    if (response.orders.length === 0) {
      return rejectWithValue('Заказ не найден');
    }
    return response.orders[0];
  } catch (error: any) {
    return rejectWithValue(error.message || 'Ошибка загрузки заказа');
  }
});

export const createOrder = createAsyncThunk<
  TOrder,
  string[],
  { rejectValue: string }
>('order/createOrder', async (ingredients, { rejectWithValue }) => {
  try {
    const response = await orderBurgerApi(ingredients);
    return response.order;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Ошибка создания заказа');
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState: initialOrderState,
  reducers: {
    clearOrder(state) {
      state.orderRequest = false;
      state.orderModalData = null;
      state.orderError = null;
    },
    setOrderData(state, action: PayloadAction<TOrder[]>) {
      state.orderData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.orderRequest = true;
        state.orderError = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderError = action.payload || 'Неизвестная ошибка';
      })
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderError = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.orderError = action.payload || 'Неизвестная ошибка';
      });
  }
});

export const { clearOrder, setOrderData } = orderSlice.actions;
export default orderSlice.reducer;
