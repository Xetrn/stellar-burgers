import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '../../utils/burger-api';

const ERROR_MESSAGES = {
  USER_LOAD_FAILED: 'Не удалось загрузить пользователя',
  USER_UPDATE_FAILED: 'Ошибка обновления пользователя',
  REGISTRATION_FAILED: 'Ошибка регистрации',
  LOGIN_FAILED: 'Ошибка входа',
  LOGOUT_FAILED: 'Ошибка при выходе'
};

export interface IUserSlice {
  user: TUser | null;
  isAuthChecked: boolean;
  error: string | null;
  isLoading: boolean;
}

export const initialState: IUserSlice = {
  user: null,
  isAuthChecked: false,
  error: null,
  isLoading: false
};

export const getUser = createAsyncThunk('user/get', async () => getUserApi());

export const checkUser = createAsyncThunk<void>(
  'user/check',
  (_, { dispatch }) => {
    const hasToken = !!getCookie('accessToken');

    if (hasToken) {
      dispatch(getUser());
    }

    dispatch(authChecked());
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (user: Partial<TRegisterData>) => await updateUserApi(user)
);

export const userRegister = createAsyncThunk(
  'user/register',
  async ({ email, name, password }: TRegisterData) => {
    const data = await registerUserApi({ email, name, password });

    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const userLogin = createAsyncThunk(
  'user/login',
  async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password });

    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const userLogout = createAsyncThunk('user/logout', async () => {
  const response = await logoutApi();
  deleteCookie('accessToken');
  localStorage.clear();
  return response;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      // getUser
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload?.user || null;
        state.isLoading = false;
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
        state.error = ERROR_MESSAGES.USER_LOAD_FAILED;
      })

      // checkUser
      .addCase(checkUser.fulfilled, (state) => {
        state.isAuthChecked = true;
      })

      // updateUser
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
        state.error = ERROR_MESSAGES.USER_UPDATE_FAILED;
      })

      // userRegister
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = ERROR_MESSAGES.REGISTRATION_FAILED;
      })

      // userLogin
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(userLogin.rejected, (state) => {
        state.isLoading = false;
        state.error = ERROR_MESSAGES.LOGIN_FAILED;
      })

      // userLogout
      .addCase(userLogout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthChecked = true;
      })
      .addCase(userLogout.rejected, (state) => {
        state.isLoading = false;
        state.error = ERROR_MESSAGES.LOGOUT_FAILED;
      });
  }
});

export const selectUser = (state: { user: IUserSlice }) => state.user.user;
export const { authChecked } = userSlice.actions;

export default userSlice.reducer;
