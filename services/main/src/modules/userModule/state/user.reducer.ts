import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios';
import { put, takeLatest } from "redux-saga/effects";
import { authApi, AuthResponse } from '../api/auth-api';

interface Profile {
  id: number
  email: string
  userName: string
}

interface UserState {
  profile: Profile | null
}

const initialState: UserState = {
  profile: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload
    },
  },
})

export const {
  setProfile
} = userSlice.actions

export const userReducer = userSlice.reducer