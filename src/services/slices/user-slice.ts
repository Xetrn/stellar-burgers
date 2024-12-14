import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getUserApi } from '@api';
import { TUser } from '@utils-types';

interface TUserState {
  userData: TUser | null;
  userError: string | null | undefined;
  IsUserDataLoading: boolean;
}

const initialState: TUserState = {
  userData: null,
  userError: null,
  IsUserDataLoading: false
};

export const getUser = createAsyncThunk('user/getUser', getUserApi);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getUserData: (store) => store.userData,
    getUserError: (store) => store.userError,
    getUserLoading: (store) => store.IsUserDataLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.IsUserDataLoading = true;
        state.userError = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.IsUserDataLoading = false;
        state.userError = action.error.message;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.IsUserDataLoading = false;
      });
  }
});

export const { getUserData, getUserError, getUserLoading } =
  userSlice.selectors;
