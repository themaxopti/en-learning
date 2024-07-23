import { componentsPropertiesSlice } from "@packages/shared/src/state/reducers/componentsProperties/componentsProperties.reducer"
import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit"
import { dictionaryReducer } from "../modules/dictionaryModule"

interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    componentsProperties: componentsPropertiesSlice.reducer,
    dictionary: dictionaryReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
