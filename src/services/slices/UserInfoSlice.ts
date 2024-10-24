import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { getCookie, setCookie, deleteCookie } from '../../utils/cookie';
import {
  refreshToken,
  fetchWithRefresh,
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  forgotPasswordApi,
  resetPasswordApi
} from '@api';

//todo!!! need to sort out with saving tokens!

type TStateUser = {
  isAuthChecked: boolean; //флаг для статуса проверки токена пользователя
  isAuthenticated: boolean;
  user: TUser | null; //null, если пользователь не авторизован
  loginUserError: null | string; // Ошибка логина, если есть
  loginUserRequest: boolean; // Флаг для состояния запроса логина
};

const initialState: TStateUser = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  loginUserError: null,
  loginUserRequest: false
};

export const userApi = createAsyncThunk('user/userApi', getUserApi);
export const toRegisterUser = createAsyncThunk(
  'user/register',
  registerUserApi
);
export const logInUser = createAsyncThunk('user/login', loginUserApi);

export const logOutUser = createAsyncThunk('user/logout', logoutApi);

export const updateUser = createAsyncThunk('user/update', updateUserApi);

export const userStateSlice = createSlice({
  name: 'userstate',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userApi.pending, (state) => {
        state.isAuthenticated = false;
        state.loginUserError = null;
        state.user = null;
      })
      .addCase(userApi.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(userApi.rejected, (state, action) => {
        state.loginUserError =
          action.error.message || 'Failed to fetch user data';
        state.isAuthenticated = false;
        state.user = null;
        state.isAuthChecked = true;
      })
      .addCase(toRegisterUser.pending, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(toRegisterUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(toRegisterUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.loginUserError =
          action.error.message || 'Failed to fetch register user ';
      })
      .addCase(logInUser.pending, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loginUserRequest = true;
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.loginUserRequest = false;
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loginUserError =
          action.error.message || 'Failed to fetch Log in user ';
        state.loginUserRequest = false;
      })
      .addCase(logOutUser.pending, (state) => {
        state.isAuthenticated = true;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.loginUserError =
          action.error.message || 'Failed to fetch Log Out user ';
      })
      .addCase(updateUser.pending, (state) => {
        state.isAuthenticated = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loginUserError =
          action.error.message || 'Failed to fetch update user ';
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthenticated: (state) => state.isAuthenticated,
    selectLoginUserError: (state) => state.loginUserError,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectloginUserRequest: (state) => state.loginUserRequest
  }
});

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(userApi()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);

export const { authChecked } = userStateSlice.actions;
export default userStateSlice;

export const {
  selectUser,
  selectIsAuthenticated,
  selectLoginUserError,
  selectIsAuthChecked,
  selectloginUserRequest
} = userStateSlice.selectors;
