import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "@utils-types";
import { loginOnEnterApp, loginUser, logoutUser, registerUser, updateUser } from "../thunks";
import { TRegisterData } from "@api";
import { deleteCookie, setCookie } from "../../../src/utils/cookie";

export type UserData =  {
    user: TUser | undefined
    isAuthenthicated: boolean,
    loginError: string,
    registerError: string,
    updateError: string,
    logoutError: string
}

const initialState: UserData = {
    user: undefined,
    isAuthenthicated: false,
    loginError: "",
    registerError: "",
    updateError: "",
    logoutError: ""
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.registerError = "";
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.user = {email: action.payload.user.email, name: action.payload.user.name}
            state.isAuthenthicated = true;
            localStorage.setItem("refreshToken", action.payload.refreshToken);
            setCookie("accessToken", action.payload.accessToken);
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.registerError = action.error.message ?? "Неизвестная ошибка";
        })
        .addCase(loginUser.pending, (state) => {
            state.loginError = "";
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.user = {email: action.payload.user.email, name: action.payload.user.name}
            state.isAuthenthicated = true;
            localStorage.setItem("refreshToken", action.payload.refreshToken);
            setCookie("accessToken", action.payload.accessToken);
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loginError = action.error.message ?? "Неизвестная ошибка";
        })
        .addCase(logoutUser.pending, (state) => {
            state.logoutError = "";
        })
        .addCase(logoutUser.fulfilled, (state) => {
            state = Object.assign(state, initialState);
            localStorage.removeItem("refreshToken");
            deleteCookie("accessToken");
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.logoutError = action.error.message ?? "Неизвестная ошибка";
        })
        .addCase(loginOnEnterApp.fulfilled, (state, action) => {
            state.user = {email: action.payload.user.email, name: action.payload.user.name};
            state.isAuthenthicated = true;
        })
        .addCase(updateUser.pending, (state) => {
            state.updateError = "";
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.user = {...action.payload.user}
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.updateError = action.error.message ?? "Неизвестная ошибка";
        })
    }
})

export const userReducer = userSlice.reducer;