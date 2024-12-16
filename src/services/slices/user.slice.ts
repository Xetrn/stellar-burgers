import { getUserApi, refreshToken, updateUserApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie'; //не работает через src/../../

interface IUserSlice {
  isAuth: boolean;
  user: TUser;
  error: string | null;
  isLoading: boolean;
}

const initialState: IUserSlice = {
  isAuth: false,
  user: {} as TUser,
  error: null,
  isLoading: false
};

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserApi();
      return response.user;
    } catch (error) {
      return rejectWithValue('Не удалось загрузить данные пользователя');
    }
  }
);

export const refreshUserToken = createAsyncThunk(
  'user/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const data = await refreshToken();
      setCookie('accessToken', data.accessToken);
      setCookie('refreshToken', data.refreshToken);
      return data.accessToken;
    } catch (error) {
      return rejectWithValue('Не удалось обновить токены');
    }
  }
);

export const updateUserAction = createAsyncThunk(
  'user/updateUser',
  async (userData: Partial<TUser>, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(userData);
      return response.user;
    } catch (error) {
      return rejectWithValue('Не удалось обновить данные пользователя');
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
      state.isAuth = true;
      state.error = null;
    },
    logoutUser: (state) => {
      state.user = {} as TUser;
      state.isAuth = false;
      state.error = null;
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchUser
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
      // updateUser
      .addCase(updateUserAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserAction.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
        state.isLoading = false;
      })
      .addCase(updateUserAction.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
      // refreshUserToken
      .addCase(refreshUserToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(refreshUserToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        // Здесь accessToken можно использовать в будущем запросах
      })
      .addCase(refreshUserToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { setUser, logoutUser, setError, clearError, setUserLoading } =
  userSlice.actions;

export const UserReducer = userSlice.reducer;
