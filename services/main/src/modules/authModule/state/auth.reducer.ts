import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios';
import { put, takeLatest } from "redux-saga/effects";
import { authApi, AuthResponse } from '../api/auth-api';
import { setProfile } from '@/modules/userModule';

interface AuthState {
  isAuth: boolean | null
  loading: boolean
}

const initialState: AuthState = {
  loading: true,
  isAuth: false
}

export const AUTH_ACITON = 'AUTH_ACITON'
export const LOGOUT_ACITON = 'LOGOUT_ACITON'

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})

export const {
  setIsAuth,
  setAuthLoading
} = authSlice.actions


export function* authSaga(): any {
  try {
    yield put(setAuthLoading(true));
    const response: AuthResponse = yield authApi.auth()

    if (response.statusCode === 400 || response.statusCode === 404) {
      yield put(setIsAuth(false));
      yield put(setAuthLoading(false));
      return
    }

    yield put(setProfile(response.data))
    yield put(setIsAuth(true))
    yield put(setAuthLoading(false));
  } catch (error) {
    console.log('error here');
    yield put(setIsAuth(false))
    yield put(setAuthLoading(false));
  }
}

export function* logoutSaga(): any {
  try {
    yield authApi.logout()

    yield put(setIsAuth(false));
    yield put(setProfile(null))
    yield put(setAuthLoading(false));
  } catch (error) {
    // yield put(getUserErrorAction(error));
  }
}

export function* watchAuthSaga() {
  yield takeLatest(AUTH_ACITON, authSaga);
}

export function* watchLogoutSaga() {
  yield takeLatest(LOGOUT_ACITON, logoutSaga);
}

export const authReducer = authSlice.reducer