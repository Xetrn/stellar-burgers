import { TOrdersState } from '../slices/user-orders';
import { TOrder } from '@utils-types';
import { PayloadAction } from '@reduxjs/toolkit';

export const onPendingGetUserOrdersRequest = (state: TOrdersState) => {
  state.isLoadingUserOrders = true;
};

export const onFulfilledGetUserOrdersRequest = (
  state: TOrdersState,
  action: PayloadAction<
    TOrder[],
    string,
    { arg: void; requestId: string; requestStatus: 'fulfilled' }
  >
) => {
  state.orders = action.payload;
  state.isLoadingUserOrders = false;
};

export const onRejectedGetUserOrdersRequest = (state: TOrdersState) => {
  state.isLoadingUserOrders = false;
};
