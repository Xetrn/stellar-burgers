import { TAuthResponse, TLoginData, TRegisterData, TUserResponse } from "@api";
import { SerializedError } from "@reduxjs/toolkit";
import { TUser } from "@utils-types";
import { UserData, userReducer } from "../../../src/services/slices/userSlice";
import { loginUser, registerUser, logoutUser, updateUser, loginOnEnterApp } from "../../../src/services/thunks";
import { fulfilledDesc, pendingDesc, rejectedDesc } from "../../../src/utils/const";


const userRegisterData: TRegisterData = {
    name: "test",
    email: "test334@test.ru",
    password: "idklol"
};

const userUpdatedData: TUser = {
    name: "test1",
    email: "test3341@test.ru"
};

const userData: TUser = {
    email: "test334@test.ru",
    name: "test"
};

const accessToken: string = "access";
const refreshToken: string = "refresh";

const registerResponse: TAuthResponse = {
    success: true,
    user: userRegisterData,
    accessToken,
    refreshToken
};

const loginResponse: TAuthResponse = {
    ...registerResponse,
    user: userData
};

const onAppEnterLoginResponse: TUserResponse = {
    success: true,
    user: userData
};

const updateUserResponse: TUserResponse = {
    success: true,
    user: userUpdatedData
};

const errors: Record<string, SerializedError> = {
    loginFail: {
        message: "Некорректные данные для входа или ошибка сервера"
    },
    registerFail: {
        message: "На почту уже зарегистрирован аккаунт или ошибка сервера"
    },
    logoutFail: {
        message: "Не удалось выйти из аккаунта. Ошибка сервера"
    },
    updateFail: {
        message: "Некорректные данные или ошибка сервера"
    }
};

const testStorage: Record<string, string> = {

};

const cookies: Record<string, string> = {

};

global.localStorage = {
    length: 0,
    clear: jest.fn(() => Object.assign(testStorage, {})),
    getItem: jest.fn((key: string) => testStorage[key]),
    removeItem: jest.fn((key: string) => delete testStorage[key]),
    setItem: jest.fn((key: string, value: string) => testStorage[key] = value),
    key: jest.fn()
};

beforeEach(() => {
    Object.assign(testStorage, {});
    Object.assign(cookies, {});
});

jest.mock("../../../src/utils/cookie", () => ({
    setCookie: jest.fn((key: string, value: string) => cookies[key] = value),
    deleteCookie: jest.fn((key: string) => delete cookies[key])
}));


describe("Тесты для редьюсера пользователя", () => {
    const initialState: UserData = {
        isAuthenthicated: false,
        loginError: "",
        logoutError: "",
        registerError: "",
        updateError: "",
        user: undefined
    };

    const loggedInState: UserData = {
        ...initialState,
        isAuthenthicated: true,
        user: userData,
    };

    describe("Тесты на проверку функционала регистрации", () => {
        test(pendingDesc, () => {
            const newState = userReducer(initialState, {type: registerUser.pending.type});
            expect(newState.registerError).toHaveLength(0);
        });

        test(fulfilledDesc, () => {
            const newState = userReducer(initialState, {type: registerUser.fulfilled.type, payload: registerResponse});
            expect(newState.isAuthenthicated).toBe(true);
            expect(newState.user).toEqual(userData);
            expect(testStorage.refreshToken).toBe(refreshToken);
            expect(cookies.accessToken).toBe(accessToken);
        });

        test(rejectedDesc, () => {
            const newState = userReducer(initialState, {type: registerUser.rejected.type, error: errors.registerFail});
            expect(newState.registerError).not.toHaveLength(0);
        })
    });

    describe("Тесты на проверку функционала авторизации", () => {
        test(pendingDesc, () => {
            const newState = userReducer(initialState, {type: loginUser.pending.type});
            expect(newState.loginError).toHaveLength(0);
        });

        test(fulfilledDesc, () => {
            const newState = userReducer(initialState, {type: loginUser.fulfilled.type, payload: loginResponse});
            expect(newState.isAuthenthicated).toBe(true);
            expect(newState.user).toEqual(userData);
            expect(testStorage.refreshToken).toBe(refreshToken);
            expect(cookies.accessToken).toBe(accessToken);
        });

        test(rejectedDesc, () => {
            const newState = userReducer(initialState, {type: loginUser.rejected.type, error: errors.loginFail});
            expect(newState.loginError).not.toHaveLength(0);
        })
    });

    describe("Тесты на проверку выхода из аккаунта", () => {
        test(pendingDesc, () => {
            const newState = userReducer(loggedInState, {type: logoutUser.pending.type});
            expect(newState.logoutError).toHaveLength(0);
        });

        test(fulfilledDesc, () => {
            cookies.accessToken = accessToken;
            testStorage.refreshToken = refreshToken;
            const newState = userReducer(loggedInState, {type: logoutUser.fulfilled.type});
            expect(newState.isAuthenthicated).toBe(false);
            expect(newState.user).toBeUndefined();
            expect(Object.keys(testStorage)).toHaveLength(0);
            expect(Object.keys(cookies)).toHaveLength(0);
        });

        test(rejectedDesc, () => {
            const newState = userReducer(loggedInState, {type: logoutUser.rejected.type, error: errors.logoutFail});
            expect(newState.logoutError).not.toHaveLength(0);
        })
    });

    describe("Тесты на проверку авто-входа при запуске сайта", () => {
        test("Авто-вход", () => {
            const newState = userReducer(initialState, {type: loginOnEnterApp.fulfilled.type, payload: onAppEnterLoginResponse});
            expect(newState.isAuthenthicated).toBe(true);
            expect(newState.user).toEqual(userData);
        })
    });

    describe("Тесты на проверку обновления данных пользователя", () => {
        test(pendingDesc, () => {
            const newState = userReducer(loggedInState, {type: updateUser.pending.type});
            expect(newState.updateError).toHaveLength(0);
        });

        test(fulfilledDesc, () => {
            const newState = userReducer(loggedInState, {type: updateUser.fulfilled.type, payload: updateUserResponse});
            expect(newState.user).toEqual(userUpdatedData);
        });

        test(rejectedDesc, () => {
            const newState = userReducer(loggedInState, {type: updateUser.rejected.type, error: errors.updateFail});
            expect(newState.updateError).not.toHaveLength(0);
        })
    })
})