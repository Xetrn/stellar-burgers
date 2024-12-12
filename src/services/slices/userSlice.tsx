import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const registerFetch = createAsyncThunk('user/register', registerUserApi);
export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const response = await loginUserApi({ email, password });
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);
export const logout = createAsyncThunk('user/logout', () => {
  logoutApi().then(() => {
    deleteCookie('accessToken');
    localStorage.clear();
  });
});
export const apiGetUser = createAsyncThunk('user/getUser', getUserApi);
export const updateUser = createAsyncThunk('user/update', updateUserApi);

export interface TUserState {
  isAuthVerified: boolean;
  user: TUser;
  error: string | undefined;
}

const initialState: TUserState = {
  isAuthVerified: false,
  user: {
    email: '',
    name: ''
  },
  error: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    isAuthCheckedSelector: (state) => state.isAuthVerified,
    getUserSelector: (state) => state.user,
    getNameSelector: (state) => state.user.name,
    getErrorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerFetch.fulfilled, (state, action) => {
        state.isAuthVerified = true;
        state.user = action.payload.user;
        state.error = '';
      })
      .addCase(registerFetch.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(registerFetch.pending, (state) => {
        state.error = '';
      });
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthVerified = true;
        state.user = action.payload;
        state.error = '';
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthVerified = false;
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.isAuthVerified = false;
        state.error = '';
      });
    builder
      .addCase(apiGetUser.fulfilled, (state, action) => {
        state.isAuthVerified = true;
        state.user = action.payload.user;
      })
      .addCase(apiGetUser.rejected, (state, action) => {
        state.isAuthVerified = false;
        state.error = action.error.message!;
      });
    builder
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthVerified = true;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isAuthVerified = false;
        state.error = action.error.message!;
      })
      .addCase(updateUser.pending, (state) => {
        state.error = '';
      });
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthVerified = false;
      state.user = { email: '', name: '' };
    });
  }
});

export const {
  isAuthCheckedSelector,
  getUserSelector,
  getNameSelector,
  getErrorSelector
} = userSlice.selectors;
export const userReducer = userSlice.reducer;
