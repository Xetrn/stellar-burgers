import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

import { deleteCookie, getCookie, setCookie } from '@src/utils/cookie';
import { getUserApi, loginUserApi, logoutApi, registerUserApi, updateUserApi } from '@api';

type UserState = {
    user: TUser | undefined;
    isAuth: boolean;
    error: string;
};

const initialState: UserState = {
    user: undefined,
    isAuth: !!getCookie('accessToken'),
    error: ''
};

export const getUser = createAsyncThunk('user/get', getUserApi);
export const updateUser = createAsyncThunk('user/update', updateUserApi);
export const registerUser = createAsyncThunk('user/register', registerUserApi);
export const loginUser = createAsyncThunk('auth/login', loginUserApi);
export const logoutUser = createAsyncThunk('user/logout', logoutApi);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = { email: action.payload.user.email, name: action.payload.user.name };
                state.isAuth = true;
            })

            .addCase(updateUser.pending, (state) => {
                state.error = '';
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.user = { ...action.payload.user };
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.error = action.error.message ?? 'Неизвестная ошибка при обновлении данных';
            })

            .addCase(registerUser.pending, (state) => {
                state.error = '';
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = { email: action.payload.user.email, name: action.payload.user.name };
                state.isAuth = true;

                localStorage.setItem('refreshToken', action.payload.refreshToken);
                setCookie('accessToken', action.payload.accessToken);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.error.message ?? 'Ошибка';
            })

            .addCase(loginUser.pending, (state) => {
                state.error = '';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = { email: action.payload.user.email, name: action.payload.user.name };
                state.isAuth = true;

                localStorage.setItem('refreshToken', action.payload.refreshToken);
                setCookie('accessToken', action.payload.accessToken);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.error.message ?? 'Ошибка';
            })

            .addCase(logoutUser.pending, (state) => {
                state.error = '';
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isAuth = initialState.isAuth;
                state.user = initialState.user;
                state.error = initialState.error;

                deleteCookie('accessToken');
                localStorage.removeItem('refreshToken');
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.error.message ?? 'Неизвестная ошибка при выходе из аккаунта';
            });
    }
});

export const userReducer = userSlice.reducer;
