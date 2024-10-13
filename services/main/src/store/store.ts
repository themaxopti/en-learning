import { componentsPropertiesSlice } from "@packages/shared/src/state/reducers/componentsProperties/componentsProperties.reducer"
import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit"
import { dictionaryReducer } from "../modules/dictionaryModule"
import { errorReducer } from "@packages/shared/src/modules/errorModule"
import { authReducer } from "@/modules/authModule"
import createSagaMiddleware from "@redux-saga/core";
import { all } from "redux-saga/effects"
import { watchAuthSaga, watchLogoutSaga } from "@/modules/authModule/state/auth.reducer"
import { userReducer } from "@/modules/userModule"
import { dictionarySagasWathcers, dictionarySagasWathcersRun, watchGetDictionariesSaga } from "@/modules/dictionaryModule/state/sagas"
// import { watchChangeWordsIndexesSaga, watchCreateWordSaga, watchCreateWordsSaga, watchDeleteWordSaga, watchDeleteWordsSaga, watchGetDictionariesSaga, watchGetWordsSaga } from "@/modules/dictionaryModule/state/dictionary.reducer"

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

    ...dictionarySagasWathcersRun()

    // watchGetDictionariesSaga(),
    // watchGetWordsSaga(),
    // watchCreateWordSaga(),
    // watchCreateWordsSaga(),
    // watchDeleteWordSaga(),
    // watchDeleteWordsSaga(),
    // watchChangeWordsIndexesSaga()
  ]);
}

const sagaMiddleware = createSagaMiddleware();

export const rootReducer = {
  componentsProperties: componentsPropertiesSlice.reducer,
  dictionary: dictionaryReducer,
  error: errorReducer,
  auth: authReducer,
  user: userReducer
}

export function getStore(){
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false, thunk: false }).concat(sagaMiddleware),
  })
}

export const store = getStore()

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
