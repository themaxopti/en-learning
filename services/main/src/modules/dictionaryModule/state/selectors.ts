import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../../store/store'
import { v4 as uuidv4 } from 'uuid'

export const selectMode = (state: RootState) => state.dictionary.selectMode
export const wordsSelector = (state: RootState) => state.dictionary.words
export const isSelectedAllMode = (state: RootState) =>
  state.dictionary.selectAllMode

export const currentDictionarySelector = (state: RootState) =>
  state.dictionary.currentDictionary

export const isDictionariesLoadingSelector = (state: RootState) =>
  state.dictionary.loadDictionaries
export const isWordsLoadingSelector = (state: RootState) =>
  state.dictionary.loadWords
export const dictionariesCardsSelector = (state: RootState) =>
  state.dictionary.dictionaries
export const isDictionaryExistSelector = (state: RootState) =>
  state.dictionary.isDictionaryExist
export const newWordsPendingSelector = (state: RootState) =>
  state.dictionary.newWords.pending
export const newWordsAmountSelector = (state: RootState) =>
  state.dictionary.newWords.amount

export const uuidWordsSelector = createSelector(wordsSelector, state => {
  return state.map(word => {
    return { ...word, title: `${word.title} ${uuidv4()}` }
  })
})

export const selectedWordsSelector = createSelector(wordsSelector, words => {
  return words
    .filter(word => {
      return word.checked === true
    })
    .map(el => {
      return {
        ...el,
        title: el.title.split(' ').slice(0, -1).join(' ')
      }
    })
})
