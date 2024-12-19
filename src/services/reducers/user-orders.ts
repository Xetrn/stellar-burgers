import { TOrdersState } from '../slices/user-orders';
import { TOrder } from '@utils-types';
import { PayloadAction, SerializedError } from '@reduxjs/toolkit';

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

export const onRejectedGetUserOrdersRequest = (
  state: TOrdersState,
  action: PayloadAction<
    unknown,
    string,
    | ({
        arg: void;
        requestId: string;
        requestStatus: 'rejected';
        aborted: boolean;
        condition: boolean;
      } & { rejectedWithValue: true })
    | ({
        arg: void;
        requestId: string;
        requestStatus: 'rejected';
        aborted: boolean;
        condition: boolean;
      } & { rejectedWithValue: false }),
    SerializedError
  >
) => {
  state.isLoadingUserOrders = false;
  state.error = action.error.message;
};
