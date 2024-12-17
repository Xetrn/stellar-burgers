import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

const initialState = {
  isAuthChecked: false as boolean,
  user: {
    email: '',
    name: ''
  } as TUser,
  error: '' as string | undefined
};

// Async thunks
export const apiGetUser = createAsyncThunk('user/getuser', getUserApi);
export const updateUser = createAsyncThunk('user/update', updateUserApi);
export const register = createAsyncThunk('user/register', registerUserApi);
export const login = createAsyncThunk('user/login', loginUserApi);
export const logout = createAsyncThunk('user/logout', logoutApi);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.error = '';
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(register.pending, (state) => {
        state.error = '';
      });

    // Login
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.error = '';
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(login.pending, (state) => {
        state.isAuthChecked = false;
        state.error = '';
      });

    // Get User
    builder
      .addCase(apiGetUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(apiGetUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message || 'An error occurred';
      });

    // Update User
    builder
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(updateUser.pending, (state) => {
        state.error = '';
      });

    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthChecked = false;
      state.user = { email: '', name: '' };
    });
  },
  selectors: {
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    getUser: (state) => state.user,
    getName: (state) => state.user.name,
    getError: (state) => state.error
  }
});

export const { isAuthCheckedSelector, getUser, getName, getError } =
  userSlice.selectors;
