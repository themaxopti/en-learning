import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit'
import { words } from '..'
import { v4 as uuidv4 } from 'uuid';
import { delay, put, takeLatest } from 'redux-saga/effects';
import { dictionaryApi } from '../api/dictionary-api';
import { CreateWordRes, CreateWordsRes, DeleteWordRes, DeleteWordsRes, GetDictionariesRes, GetDictionaryRes, GetWordsRes } from '../api/dictionary-api.dto';
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

interface DictionaryState {
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
    setIsDictionaryExist: (state, action: PayloadAction<boolean>) => {
      state.isDictionaryExist = action.payload
    },
    setDictionariesLoading: (state, action: PayloadAction<boolean>) => {
      state.loadDictionaries = action.payload
    },
    setWordsLoading: (state, action: PayloadAction<boolean>) => {
      state.loadWords = action.payload
    },
    setDictionaries: (state, action: PayloadAction<DictionaryType[]>) => {
      state.dictionaries = action.payload
    },
    setWords: (state, action: PayloadAction<WordType[]>) => {
      state.words = action.payload
    },
    changeIndex: (state, action: PayloadAction<WordType>) => {
      console.log(action.payload);
      const changedIndexes: any[] = []
      state.words.map((el, i) => {
        if (i === 0) {
          if (el.index !== 1) {
            changedIndexes.push({ title: el.title, id: el.id, indexWill: 1 })
          }
          el.index = 1
          return el
        }
        const previousWord = state.words[i - 1]

        if (el.index - previousWord.index !== 1) {
          changedIndexes.push({ title: el.title, id: el.id, indexWill: previousWord.index + 1 })
          console.log(changedIndexes, 'changedIndexes');
        }

        el.index = previousWord.index + 1

        return el
      })
      // const newWords = state.words.map(el => el.index)
      // const changedIndexes = []
      console.log(changedIndexes);

      // const changedIndexes = prevIndexes.filter((elIndex,i) => {
      //   return elIndex !== newWords[i]
      // })
      // console.log(prevIndexes,newWords,changedIndexes);
    },
    setSelectMode: (state, action: PayloadAction<boolean>) => {
      state.selectMode = action.payload
    },
    setSelectAllMode: (state, action: PayloadAction<boolean>) => {
      if (!state.selectAllMode) {
        state.words.map(el => {
          if (state.selectMode) {
            el.checked = true
          }
          return el
        })
        state.selectAllMode = true
      } else {
        state.words.map(el => {
          if (state.selectMode) {
            el.checked = false
          }
          return el
        })
        state.selectAllMode = false
      }
    },
    setCurrentDictionary: (state, action: PayloadAction<DictionaryType>) => {
      state.currentDictionary = action.payload
    },
    reorder: (state, action: PayloadAction<WordType[]>) => {
      const array = action.payload
      state.words = array
    },
    addWord: (state, action: PayloadAction<WordType>) => {
      state.words.push(action.payload)
    },
    addManyWords: (
      state,
      action: PayloadAction<{ title: string; translate: string, id: number, index: number }[]>
    ) => {
      let lastIndex = state.words.length - 1
      const newArr = action.payload.map<WordType>((el, i) => {
        lastIndex = lastIndex + 1
        return {
          checked: false,
          index: el.index,
          translate: el.translate,
          title: `${el.title} ${uuidv4()}`,
          id: el.id
        }
      })
      state.words.push(...newArr)
    },
    selectItem: (state, action: PayloadAction<WordType>) => {
      const word = state.words.find(el => el.index === action.payload.index)
      word.checked = !word.checked
      if (!word.checked) {
        state.selectAllMode = false
      }
    },
    removeSelectedItems: state => {
      const selectedItems = state.words
        .filter(el => el.checked === true)
        .map(el => el.index)
      selectedItems.forEach(el => {
        const indexOfItems = state.words.map(el => el.index)
        console.log(indexOfItems.indexOf(el), state.words.length)
        state.words.splice(indexOfItems.indexOf(el), 1)
      })
    },
    removeWord: (state, action: PayloadAction<number>) => {
      state.words.splice(action.payload, 1)
    },
    setNewWordsPending: (state, action: PayloadAction<boolean>) => {
      state.newWords.pending = action.payload
    },
    setNewWordsAmount: (state, action: PayloadAction<number>) => {
      state.newWords.amount = action.payload
    },
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
  setCurrentDictionary
} = dictionarySlice.actions

export const GET_DICTIONARIES = "GET_DICTIONARIES"
export const GET_WORDS = "GET_WORDS"
export const CREATE_WORD = "CREATE_WORD"
export const CREATE_WORDS = "CREATE_WORDS"
export const DELETE_WORDS = "DELETE_WORDS"
export const DELETE_WORD = "DELETE_WORD"

export function* getDictionariesSaga({ payload: { limit, page } }: GetDictionariesSagaParam) {
  try {
    yield put(setDictionariesLoading(true));
    const response: GetDictionariesRes = yield dictionaryApi.getDictionaries({ limit, page })

    if (response.statusCode !== 200) {
      return
    }

    yield put(setDictionaries(response.data));
    yield put(setDictionariesLoading(false));
  } catch (error) {
  }
}

export function* getWordsSaga({ payload: { limit, page, dictionaryId } }: GetWordsSagaParam) {
  try {
    yield put(setWordsLoading(true));
    yield put(setIsDictionaryExist(true));

    const wordsResponse: GetWordsRes = yield dictionaryApi.getWords({ limit, page, dictionaryId })
    const currentDictionaryResponse: GetDictionaryRes =
      yield dictionaryApi.getDictionary({ id: dictionaryId })

    if (wordsResponse.statusCode === 404 || currentDictionaryResponse.statusCode === 404) {
      yield delay(5000)
      yield put(setIsDictionaryExist(false));
      yield put(setWordsLoading(false));
      return
    }

    yield put(setCurrentDictionary({
      id: currentDictionaryResponse.data.id,
      title: currentDictionaryResponse.data.title,
      userId: currentDictionaryResponse.data.userId
    }))

    if (wordsResponse.statusCode === 401) {
      yield put(setWordsLoading(false));
      return
    }

    const changedWords = wordsResponse.data.map(el => {
      return { ...el, title: `${el.title} ${uuidv4()}`, checked: false }
    })

    yield put(setWords(changedWords as any));
    yield put(setWordsLoading(false));
  } catch (error) {
    throw error
  }
}


export function* createWordSaga({ payload: { title, translate, dictionaryId } }: CreateWordSagaParam) {
  try {
    yield put(setNewWordsPending(true))
    yield put(setNewWordsAmount(1))

    const response: CreateWordRes = yield dictionaryApi.createWord({ dictionaryId, title, translate })

    if (response.statusCode !== 200) {
      yield put(setNewWordsPending(false))
      yield put(setNewWordsAmount(0))
      return
    }

    console.log(response.data);

    yield delay(2000)
    yield put(setNewWordsPending(false))
    yield put(addWord({
      checked: false,
      index: response.data.index,
      globalIndex: response.data.globalIndex,
      title: `${response.data.title} ${uuidv4()}`,
      translate: response.data.translate,
      id: response.data.id
    }))
  } catch (error) {
    throw error
  }
}

export function* createWordsSaga({ payload }: CreateWordsSagaParam) {
  try {
    yield put(setNewWordsPending(true))
    yield put(setNewWordsAmount(payload.words.length))

    const response: CreateWordsRes = yield dictionaryApi.createWords(payload)

    if (response.statusCode !== 200) {
      yield put(setNewWordsPending(false))
      yield put(setNewWordsAmount(0))
      return
    }

    yield delay(2000)
    yield put(setNewWordsPending(false))
    yield put(setNewWordsAmount(0))
    yield put(addManyWords(response.data))
  } catch (error) {
    throw error
  }
}

export function* deleteWordSaga({ payload }: DeleteWordSagaParam) {
  try {
    const response: DeleteWordRes = yield dictionaryApi.deleteWord(payload)
    console.log(response);

    if (response.statusCode !== 200) {
      return
    }

    yield put(removeWord(payload.i))
  } catch (error) {
    throw error
  }
}

export function* deleteWordsSaga({ payload }: DeleteWordsSagaParam) {
  try {
    // yield put(setNewWordsPending(true))
    // yield put(setNewWordsAmount(1))

    const response: DeleteWordsRes = yield dictionaryApi.deleteWords(payload)
    yield put(removeSelectedItems())
    // if (response.statusCode !== 200) {
    //   // yield put(setNewWordsPending(false))
    //   // yield put(setNewWordsAmount(0))
    //   return
    // }

    // yield delay(2000)
    // yield put(setNewWordsPending(false))
    // yield put(addManyWords(response.data))
  } catch (error) {
    throw error
  }
}

export function* watchGetDictionariesSaga() {
  yield takeLatest(GET_DICTIONARIES, getDictionariesSaga);
}

export function* watchGetWordsSaga() {
  yield takeLatest(GET_WORDS, getWordsSaga);
}

export function* watchCreateWordSaga() {
  yield takeLatest(CREATE_WORD, createWordSaga);
}

export function* watchCreateWordsSaga() {
  yield takeLatest(CREATE_WORDS, createWordsSaga);
}

export function* watchDeleteWordSaga() {
  yield takeLatest(DELETE_WORD, deleteWordSaga);
}

export function* watchDeleteWordsSaga() {
  yield takeLatest(DELETE_WORDS, deleteWordsSaga);
}


export const dictionaryReducer = dictionarySlice.reducer