import { RootState } from '../../../store/store'

export const selectMode = (state: RootState) => state.dictionary.selectMode
export const wordsSelector = (state: RootState) => state.dictionary.words
export const isSelectedAllMode = (state: RootState) =>
  state.dictionary.selectAllMode

export const currentDictionarySelector = (state: RootState) => state.dictionary.currentDictionary 

export const isDictionariesLoadingSelector = (state: RootState) => state.dictionary.loadDictionaries
export const isWordsLoadingSelector = (state: RootState) => state.dictionary.loadWords
export const dictionariesCardsSelector = (state: RootState) => state.dictionary.dictionaries
export const isDictionaryExistSelector = (state: RootState) => state.dictionary.isDictionaryExist
export const newWordsPendingSelector = (state: RootState) => state.dictionary.newWords.pending
export const newWordsAmountSelector = (state: RootState) => state.dictionary.newWords.amount

