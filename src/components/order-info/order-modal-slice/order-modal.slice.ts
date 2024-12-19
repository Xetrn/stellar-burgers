import { createSlice } from '@reduxjs/toolkit';

import { IOrderModal } from './types';
import { getOrderById } from './getFeedById';
import { TPendingProps } from '../../../services/types';

const initialState: IOrderModal = {
  order: {
    _id: '',
    status: '',
    name: '',
    createdAt: '',
    updatedAt: '',
    number: 0,
    ingredients: []
  },
  error: null,
  loading: false
};

export const OrderModalSlice = createSlice({
  name: 'orderModalSlice',
  initialState,
  selectors: {
    selectOrder: (state) => state.order,
    selectLoading: (state) => state.loading,
    selectError: (state) => state.error
  },
  reducers: {
    resetModal: (state) => {
      state.order = {
        _id: '',
        status: '',
        name: '',
        createdAt: '',
        updatedAt: '',
        number: 0,
        ingredients: []
      };
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrderById.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload.orders[0];
    });

    builder.addCase(getOrderById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  }
});

export const { selectError, selectLoading, selectOrder } =
  OrderModalSlice.selectors;
export const { resetModal } = OrderModalSlice.actions;

export default OrderModalSlice.reducer;
