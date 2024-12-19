import { TPendingProps } from '../../../services/types';
import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { postOrder } from './postOrder';

interface iOrderCardSlice extends TPendingProps {
  orderId: number;
  orderModalData: TOrder | null;
}

const initialState: iOrderCardSlice = {
  orderId: 0,
  error: null,
  loading: false,
  orderModalData: null
};

export const OrderCardSlice = createSlice({
  name: 'orderCardSlice',
  initialState,
  reducers: {
    resetData: (state) => {
      state.loading = false;
      state.orderModalData = null;
    }
  },
  selectors: {
    selectLoading: (state) => state.loading,
    selectOrderModalData: (state) => state.orderModalData
  },
  extraReducers: (builder) =>
    builder
      .addCase(postOrder.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
        state.orderId = action.payload.order.number;
        state.loading = false;
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
});

export const { selectOrderModalData, selectLoading } = OrderCardSlice.selectors;
export const { resetData } = OrderCardSlice.actions;

export default OrderCardSlice.reducer;
