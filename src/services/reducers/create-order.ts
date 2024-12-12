import { TNewOrderState } from '../slices/create-order';
import { PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { TNewOrderResponse } from '@api';

export const onPendingCreateOrder = (state: TNewOrderState) => {
  state.isLoadingCreateOrder = true;
};

export const onFulfilledCreateOrder = (
  state: TNewOrderState,
  action: PayloadAction<
    TNewOrderResponse,
    string,
    { arg: string[]; requestId: string; requestStatus: 'fulfilled' }
  >
) => {
  state.isLoadingCreateOrder = false;
  state.orderModalData = action.payload.order;
};

export const onRejectedCreateOrder = (
  state: TNewOrderState,
  action: PayloadAction<
    unknown,
    string,
    | ({
        arg: string[];
        requestId: string;
        requestStatus: 'rejected';
        aborted: boolean;
        condition: boolean;
      } & { rejectedWithValue: true })
    | ({
        arg: string[];
        requestId: string;
        requestStatus: 'rejected';
        aborted: boolean;
        condition: boolean;
      } & { rejectedWithValue: false }),
    SerializedError
  >
) => {
  state.error = action.error.message;
};
