import { PayloadAction } from "@reduxjs/toolkit";
import { DictionaryState, DictionaryType, WordType } from "./dictionary.reducer"
import { WritableDraft } from 'immer';
import { changedIndexesHelper } from "../utils/helpers";
import { v4 as uuidv4 } from 'uuid';

type Action = (state: WritableDraft<DictionaryState>, action: PayloadAction<unknown>) => void

type DictionaryActionsType = {
    [key: string]: Action
}

export const dictionaryActions: DictionaryActionsType = {
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
    changeIndex: (state, action: PayloadAction<WordType>): any => {
        const { arrayWithChangedIndexes } = changedIndexesHelper(state.words)
        state.words = arrayWithChangedIndexes
    },
    setSelectMode: (state, action: PayloadAction<boolean>) => {
        state.selectMode = action.payload
    },
    setSelectAllMode: (state, action: PayloadAction<boolean>) => {
        if (!state.selectAllMode) {
            state.words = state.words.map(el => {
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
    create: (state, action: PayloadAction<DictionaryType>) => {
        state.currentDictionary = action.payload
    },
    setCurrentDictionary: (state, action: PayloadAction<DictionaryType>) => {
        state.currentDictionary = action.payload
    },
    reorder: (state, action: PayloadAction<WordType[]>) => {
        const array = action.payload
        state.words = array
    },
    addWord: (state, action: PayloadAction<WordType>) => {
        console.log(action.payload);

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
    removeSelectedItems: (state,action) => {
        const selectedItems = state.words
            .filter(el => el.checked === true)
            .map(el => el.index)
        selectedItems.forEach(el => {
            const indexOfItems = state.words.map(el => el.index)
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
    }
}