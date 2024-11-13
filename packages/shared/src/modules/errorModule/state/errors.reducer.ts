import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface ErrorState {
    alertError: null | string
}

const initialState: ErrorState = {
    alertError: ''
}

const errorSlice = createSlice({
    name: 'dictionary',
    initialState,
    reducers: {
        setAlertError: (state, action: PayloadAction<string>) => {
            state.alertError = action.payload
            // state.alertError = null
        },
    },
})

export const {
    setAlertError
} = errorSlice.actions

export const errorReducer = errorSlice.reducer
