import { createReducer, createSlice } from '@reduxjs/toolkit';
import { getIngredients } from '../../../components/burger-ingredients/ingredients-slice/getIngredients';
import { getFeed } from './getFeed';
import { IOrderModal } from './types';
import { getOrderById } from './getFeedById';

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

  loading: false,
  error: ''
};

export const OrderModalSlice = createSlice({
  name: 'order',
  initialState,
  selectors: {
    selectOrder: (state) => state.order,
    selectLoading: (state) => state.loading,
    selectError: (state) => state.error
  },
  reducers: {},
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
    });
  }
});

export const { selectError, selectLoading, selectOrder } =
  OrderModalSlice.selectors;
