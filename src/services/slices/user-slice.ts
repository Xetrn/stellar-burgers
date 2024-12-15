import {
  getIngredientsApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  refreshToken,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TUser } from '@utils-types';
import { setCookie, deleteCookie } from '../../utils/cookie';

/** TODO: взять переменную из стора */
// const user = {
//     name: '',
//     email: ''
//   };
interface IUserData {
  isAuth: boolean;
  user: TUser;
  error: string | null;
  isLoading: boolean;
}

const initialState: IUserData = {
  isAuth: false,
  user: {} as TUser,
  error: null,
  isLoading: false
};

// export const fetchUser = createAsyncThunk(
//   'user/fetchUser',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await getUserApi();
//       return response.user;
//     } catch (error) {
//       return rejectWithValue('Не удалось загрузить данные пользователя');
//     }
//   }
// );

// export const refreshUserToken = createAsyncThunk(
//   'user/refreshToken',
//   async (_, { rejectWithValue }) => {
//     try {
//       const data = await refreshToken();
//       setCookie('accessToken', data.accessToken);
//       setCookie('refreshToken', data.refreshToken);
//       return data.accessToken;
//     } catch (error) {
//       return rejectWithValue('Не удалось обновить токены');
//     }
//   }
// );

// export const updateUserAction = createAsyncThunk(
//   'user/updateUser',
//   async (userData: Partial<TUser>, { rejectWithValue }) => {
//     try {
//       const response = await updateUserApi(userData);
//       return response.user;
//     } catch (error) {
//       return rejectWithValue('Не удалось обновить данные пользователя');
//     }
//   }
// );

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: TRegisterData) => await registerUserApi(data)
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: TLoginData) => await loginUserApi(data)
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => await logoutApi()
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
      //regiser
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuth = true;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message ?? 'Неизвестная ошибка';
        // console.log(action.error.message);
        state.isLoading = false;
      })
      // login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuth = true;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message ?? 'Неизвестная ошибка';
        console.log(action.error.message);
        state.isLoading = false;
      })
      //logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = {} as TUser;
        state.isAuth = false;
        state.error = null;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      });

    // fetchUser
    //   .addCase(fetchUser.pending, (state) => {
    //     state.isLoading = true;
    //     state.error = null;
    //   })
    //   .addCase(fetchUser.fulfilled, (state, action) => {
    //     state.user = action.payload;
    //     state.isAuth = true;
    //     state.isLoading = false;
    //   })
    //   .addCase(fetchUser.rejected, (state, action) => {
    //     state.error = action.payload as string;
    //     state.isLoading = false;
    //   })
    //   // updateUser
    //   .addCase(updateUserAction.pending, (state) => {
    //     state.isLoading = true;
    //     state.error = null;
    //   })
    //   .addCase(updateUserAction.fulfilled, (state, action) => {
    //     state.user = { ...state.user, ...action.payload };
    //     state.isLoading = false;
    //   })
    //   .addCase(updateUserAction.rejected, (state, action) => {
    //     state.error = action.payload as string;
    //     state.isLoading = false;
    //   })
    //   // refreshUserToken
    //   .addCase(refreshUserToken.pending, (state) => {
    //     state.isLoading = true;
    //     state.error = null;
    //   })
    //   .addCase(refreshUserToken.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.error = null;
    //     // Здесь accessToken можно использовать в будущем запросах
    //   })
    //   .addCase(refreshUserToken.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.error = action.payload as string;
    //   });
  }
});

export const { setUser, setError, clearError, setUserLoading } =
  userSlice.actions;

export const UserReducer = userSlice.reducer;
