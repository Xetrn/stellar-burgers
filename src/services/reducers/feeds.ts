import { TFeedsState } from '../slices/feeds';
import { PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { TFeedsResponse } from '@api';

export const onFulfilledGetAllFeeds = (
  state: TFeedsState,
  action: PayloadAction<
    TFeedsResponse,
    string,
    { arg: void; requestId: string; requestStatus: 'fulfilled' }
  >
) => {
  state.orders = action.payload.orders;
  state.total = action.payload.total;
  state.totalToday = action.payload.totalToday;
  state.isLoadingGetFeeds = false;
};

export const onRejectedGetAllFeeds = (
  state: TFeedsState,
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
  state.orders = [];
  state.total = 0;
  state.totalToday = 0;
  state.isLoadingGetFeeds = false;
  state.error = action.error.message;
};

export const onPendingGetAllFeeds = (state: TFeedsState) => {
  state.isLoadingGetFeeds = true;
  state.error = undefined;
};
