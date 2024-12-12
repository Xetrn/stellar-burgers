import { TPendingProps } from '../../../services/types';
import { createSlice } from '@reduxjs/toolkit';
import { getFeed } from '../../order-info/order-info-slice/getFeed';
import { TOrder } from '@utils-types';
import { postOrder } from './postOrder';
import { useSelector } from '../../../services/store';
import { selectIsAuthenticated } from '../../../services/user-slice/user.slice';

interface iOrderCardSlice extends TPendingProps {
  orderId: number;
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

const initialState: iOrderCardSlice = {
  orderId: 0,
  error: null,
  loading: false,
  orderRequest: false,
  orderModalData: null
};

export const OrderCardSlice = createSlice({
  name: 'orderCartSlice',
  initialState,
  reducers: {
    resetData: (state) => {
      state.orderRequest = false;
      state.orderModalData = null;
    }
  },
  selectors: {
    selectOrderRequest: (state) => state.orderRequest,
    selectLoading: (state) => state.loading,
    selectOrderModalData: (state) => state.orderModalData
  },
  extraReducers: (builder) =>
    builder
      .addCase(postOrder.pending, (state, action) => {
        state.orderRequest = true;
        console.log(1);
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
        state.orderId = action.payload.order.number;
        state.orderRequest = false;
        console.log(2);
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.orderRequest = false;
      })
});

export const { selectOrderRequest, selectOrderModalData, selectLoading } =
  OrderCardSlice.selectors;
export const { resetData } = OrderCardSlice.actions;
