import { RootState } from '../../../store/store'

export const isAuthSelector = (state: RootState) => state.auth.isAuth
export const authLoadingSelector = (state: RootState) => state.auth.loading
