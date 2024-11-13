import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { delay, put, takeLatest } from 'redux-saga/effects'
import { quizActions } from './quiz.actions'
// import { delay } from '@packages/shared';

export type QuizModes = 'choose' | 'write'

export type QuizWord = { word: string; translate: string; variants?: string[] }

export interface QuizState {
  state: 'local' | 'remote'
  mode: QuizModes[]
  isLoading: boolean
  currentWordIndex: number
  errorInWord: boolean
  isCorrectAnswer: boolean
  words: { word: string; translate: string; variants?: string[] }[] | null
  finished: boolean
  randomMode: number
}

const initialState: QuizState = {
  state: 'local',
  mode: ['choose', 'write'],
  isLoading: true,
  errorInWord: false,
  words: [
    {
      word: 'test1',
      translate: 'тест1',
      variants: ['вариан1.1', 'тест1', 'вариан1.3'],
    },
    {
      word: 'test2',
      translate: 'тест2',
      variants: ['вариан1.1', 'тест2', 'вариан1.3'],
    },
    {
      word: 'test3',
      translate: 'тест3',
      variants: ['вариан1.1', 'тест3', 'вариан1.3'],
    },
    {
      word: 'test4',
      translate: 'тест4',
      variants: ['вариан1.1', 'вариан1.2', 'тест4'],
    },
  ],
  currentWordIndex: 0,
  isCorrectAnswer: false,
  finished: false,
  randomMode: Math.floor(Math.random() * 2),
}

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    ...quizActions,
    //    ...dictionaryActions
  },
})

export const {
  checkWord,
  changeErrorInWordState,
  setIsCorrectAnswer,
  countWordIndex,
  changeRandomMode,
} = quizSlice.actions

export const quizReducer = quizSlice.reducer
