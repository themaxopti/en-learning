import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit'
import { words } from '..'
import { v4 as uuidv4 } from 'uuid';
import { delay, put, takeLatest } from 'redux-saga/effects';
import { dictionaryApi } from '../api/dictionary-api';
import { CreateWordRes, CreateWordsRes, DeleteWordRes, DeleteWordsRes, GetDictionariesRes, GetDictionaryRes, GetWordsRes } from '../api/dictionary-api.dto';
import { dictionaryActions } from './actions';
import { DELETE_WORD, DELETE_WORDS, GET_DICTIONARIES, GET_WORDS } from './sagas';
// import { delay } from '@packages/shared';

export interface DictionaryType {
  id: number
  title: string
  userId: number
}

export interface WordType {
  id?: number
  title: string
  translate: string
  index: number
  globalIndex?: number
  userId?: number
  checked: boolean
}

interface GetDictionariesSagaParam {
  type: typeof GET_DICTIONARIES
  payload: {
    limit: number
    page: number
  }
}

export interface GetWordsSagaParam {
  type: typeof GET_WORDS
  payload: {
    dictionaryId: number
    limit: number
    page: number
  }
}

export interface CreateWordSagaParam {
  type: typeof GET_WORDS
  payload: {
    dictionaryId: number
    title: string
    translate: string
  }
}

export interface CreateWordsSagaParam {
  type: typeof GET_WORDS
  payload: {
    dictionaryId: number
    words: {
      title: string
      translate: string
    }[]
  }
}

export interface DeleteWordsSagaParam {
  type: typeof DELETE_WORDS
  payload: {
    dictionaryId: number
    wordsId: {
      id: number
    }[]
  }
}

export interface DeleteWordSagaParam {
  type: typeof DELETE_WORD
  payload: {
    dictionaryId: number
    id: number
    i: number
  }
}

export interface DictionaryState {
  words: WordType[]
  selectMode: boolean
  selectAllMode: boolean
  dictionaries: null | DictionaryType[]
  currentDictionary: DictionaryType
  loadWords: boolean
  loadDictionaries: boolean
  isDictionaryExist: boolean
  newWords: {
    pending: boolean
    amount: number
  }
}

const initialState: DictionaryState = {
  words:
    [
      // { index: 0, title: `hellored1 ${uuidv4()}`, translate: 'Привет', checked: false, id: 1 },
      // { index: 1, title: `helloredux2 ${uuidv4()}`, translate: 'Привет3', checked: false, id: 2 },
      // { index: 2, title: `helloredux3 ${uuidv4()}`, translate: 'Привет3', checked: false, id: 3 },
      // { index: 3, title: `helloredux3 ${uuidv4()}`, translate: 'Привет4', checked: false, id: 4 },
    ]
  ,
  dictionaries: null,
  currentDictionary: null,
  selectMode: false,
  selectAllMode: false,
  loadDictionaries: true,
  loadWords: true,
  isDictionaryExist: true,
  newWords: {
    pending: false,
    amount: 0
  }
}

const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {
   ...dictionaryActions
  },
})

export const {
  setSelectMode,
  reorder,
  addWord,
  setSelectAllMode,
  selectItem,
  removeSelectedItems,
  changeIndex,
  removeWord,
  addManyWords,
  setDictionaries,
  setDictionariesLoading,
  setWordsLoading,
  setWords,
  setIsDictionaryExist,
  setNewWordsAmount,
  setNewWordsPending,
  setCurrentDictionary,
  createDictionary
} = dictionarySlice.actions



export const dictionaryReducer = dictionarySlice.reducer