import { PayloadAction } from '@reduxjs/toolkit'
import { WritableDraft } from 'immer'
import { v4 as uuidv4 } from 'uuid'
import { QuizState } from './quiz.reducer'

type Action = (
  state: WritableDraft<QuizState>,
  action: PayloadAction<unknown>
) => void

type QuizActionsType = {
  [key: string]: Action
}

export const quizActions: QuizActionsType = {
  checkWord: (state, action: PayloadAction<string>) => {
    // const isLastIndex = state.currentWordIndex === state.words.length - 1
    if (state.words[state.currentWordIndex].translate !== action.payload) {
      state.errorInWord = true
    }
  },
  changeErrorInWordState: (state, action: PayloadAction<boolean>) => {
    state.errorInWord = action.payload
  },
  setIsCorrectAnswer: (state, action: PayloadAction<boolean>) => {
    state.isCorrectAnswer = action.payload
  },
  countWordIndex: state => {
    const isLastIndex = state.currentWordIndex === state.words.length - 1
    if (!isLastIndex) {
      state.currentWordIndex = state.currentWordIndex + 1
      return
    }
    state.finished = true
  },
  setIsFinished: (state, action: PayloadAction<boolean>) => {
    state.finished = action.payload
  },
  resetCurrentQuiz: (state, action: PayloadAction<boolean>) => {
    state.currentWordIndex = 0
    state.isLoading = true
    state.errorInWord = false
  },
  changeRandomMode: state => {
    state.randomMode = Math.floor(Math.random() * 2)
  },
}
