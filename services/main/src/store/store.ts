import { componentsPropertiesSlice } from "@packages/shared/src/state/reducers/componentsProperties/componentsProperties.reducer"
import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit"
import { dictionaryReducer } from "../modules/dictionaryModule"
import { errorReducer } from "@packages/shared/src/modules/errorModule"
import { authReducer } from "@/modules/authModule"
import createSagaMiddleware from "@redux-saga/core";
import { all } from "redux-saga/effects"
import { watchAuthSaga, watchLogoutSaga } from "@/modules/authModule/state/auth.reducer"
import { userReducer } from "@/modules/userModule"
import { watchCreateWordSaga, watchCreateWordsSaga, watchDeleteWordSaga, watchDeleteWordsSaga, watchGetDictionariesSaga, watchGetWordsSaga } from "@/modules/dictionaryModule/state/dictionary.reducer"

interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

export function* rootSaga() {
  yield all([
    watchAuthSaga(),
    watchLogoutSaga(),
    watchGetDictionariesSaga(),
    watchGetWordsSaga(),
    watchCreateWordSaga(),
    watchCreateWordsSaga(),
    watchDeleteWordSaga(),
    watchDeleteWordsSaga()
  ]);
}

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    componentsProperties: componentsPropertiesSlice.reducer,
    dictionary: dictionaryReducer,
    error: errorReducer,
    auth: authReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false, thunk: false }).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
