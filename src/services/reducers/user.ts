import { TUserState } from '../slices/user';
import { PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { TAuthResponse, TLoginData, TRegisterData, TUserResponse } from '@api';

export const onPendingRegister = (state: TUserState) => {
  state.error = '';
  state.isLoading = true;
};

export const onFulfilledRegister = (
  state: TUserState,
  action: PayloadAction<{ user: TUser }>
) => {
  state.isAuth = true;
  state.user = action.payload.user;
  state.error = '';
  state.isLoading = false;
};

export const onRejectedRegister = (
  state: TUserState,
  action: PayloadAction<
    unknown,
    string,
    | ({
        arg: TRegisterData;
        requestId: string;
        requestStatus: 'rejected';
        aborted: boolean;
        condition: boolean;
      } & { rejectedWithValue: true })
    | ({
        arg: TRegisterData;
        requestId: string;
        requestStatus: 'rejected';
        aborted: boolean;
        condition: boolean;
      } & { rejectedWithValue: false }),
    SerializedError
  >
) => {
  state.error = action.error.message!;
  state.isLoading = false;
};

export const onPendingLogin = (state: TUserState) => {
  state.isAuth = false;
  state.error = '';
  state.isLoading = true;
};

export const onFulfilledLogin = (
  state: TUserState,
  action: PayloadAction<
    TAuthResponse,
    string,
    {
      arg: TLoginData;
      requestId: string;
      requestStatus: 'fulfilled';
    }
  >
) => {
  state.isAuth = true;
  state.user = action.payload.user;
  state.error = '';
  state.isLoading = false;
};

export const onRejectedLogin = (
  state: TUserState,
  action: PayloadAction<
    unknown,
    string,
    | ({
        arg: TLoginData;
        requestId: string;
        requestStatus: 'rejected';
        aborted: boolean;
        condition: boolean;
      } & { rejectedWithValue: true })
    | ({
        arg: TLoginData;
        requestId: string;
        requestStatus: 'rejected';
        aborted: boolean;
        condition: boolean;
      } & { rejectedWithValue: false }),
    SerializedError
  >
) => {
  state.isAuth = false;
  state.error = action.error.message!;
  state.isLoading = false;
};

export const onFulfilledGetUser = (
  state: TUserState,
  action: PayloadAction<
    TUserResponse,
    string,
    { arg: void; requestId: string; requestStatus: 'fulfilled' }
  >
) => {
  state.isAuth = true;
  state.user = action.payload.user;
  state.isLoading = false;
};

export const onRejectedGetUser = (
  state: TUserState,
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
  state.isAuth = false;
  state.error = action.error.message!;
  state.isLoading = false;
};

export const onPendingUpdateUser = (state: TUserState) => {
  state.error = '';
};

export const onFulfilledUpdateUser = (
  state: TUserState,
  action: PayloadAction<
    TUserResponse,
    string,
    {
      arg: Partial<TRegisterData>;
      requestId: string;
      requestStatus: 'fulfilled';
    }
  >
) => {
  state.isAuth = true;
  state.user = action.payload.user;
};

export const onRejectedUpdateUser = (
  state: TUserState,
  action: PayloadAction<
    unknown,
    string,
    | ({
        arg: Partial<TRegisterData>;
        requestId: string;
        requestStatus: 'rejected';
        aborted: boolean;
        condition: boolean;
      } & { rejectedWithValue: true })
    | {
        arg: Partial<TRegisterData>;
        requestId: string;
        requestStatus: 'rejected';
        aborted: boolean;
        condition: boolean;
      },
    SerializedError
  >
) => {
  state.isAuth = false;
  state.error = action.error.message!;
};

export const onFulfilledLogout = (state: TUserState) => {
  state.isAuth = false;
  state.user = { email: '', name: '' };
};
