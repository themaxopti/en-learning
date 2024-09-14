import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit'
import { words } from '..'
import { v4 as uuidv4 } from 'uuid';


export interface Word {
  word: string
  translate: string
  index: number
  checked: boolean
}

interface DictionaryState {
  words: Word[]
  selectMode: boolean
  selectAllMode: boolean
  //   select: null | Word[];
}

const initialState: DictionaryState = {
  words: [
    { index: 0, word: `hellored1 ${uuidv4()}`, translate: 'Привет', checked: false },
    { index: 1, word: `helloredux2 ${uuidv4()}`, translate: 'Привет3', checked: false },
    { index: 2, word: `helloredux3 ${uuidv4()}`, translate: 'Привет3', checked: false },
    { index: 3, word: `helloredux3 ${uuidv4()}`, translate: 'Привет4', checked: false },
  ],
  selectMode: false,
  selectAllMode: false,
  //   select: null,
}

const dictionarySlice = createSlice({
  name: 'dictionary',
  initialState,
  reducers: {
    changeIndex: (state, action: PayloadAction<Word>) => {
      state.words.map((el, i) => {
        if (i === 0) {
          el.index = 0
          return el
        }
        const previousWord = state.words[i - 1]
        el.index = previousWord.index + 1
        return el
      })
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
    reorder: (state, action: PayloadAction<Word[]>) => {
      const array = action.payload
      state.words = array
    },
    addWord: (state, action: PayloadAction<Word>) => {
      state.words.push(action.payload)
    },
    addManyWords: (
      state,
      action: PayloadAction<{ word: string; translate: string }[]>
    ) => {
      let lastIndex = state.words.length - 1
      const newArr = action.payload.map<Word>((el, i) => {
        lastIndex = lastIndex + 1
        return {
          checked: false, 
          index: lastIndex,
          translate: el.translate,
          word: `${el.word} ${uuidv4()}`,
        }
      })
      state.words.push(...newArr)
    },
    selectItem: (state, action: PayloadAction<Word>) => {
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
} = dictionarySlice.actions

export const dictionaryReducer = dictionarySlice.reducer