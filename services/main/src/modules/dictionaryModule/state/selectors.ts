import { RootState } from '../../../store/store'

export const selectMode = (state: RootState) => state.dictionary.selectMode
export const wordsSelector = (state: RootState) => state.dictionary.words
export const isSelectedAllMode = (state: RootState) =>
  state.dictionary.selectAllMode
