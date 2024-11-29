import { PayloadAction } from '@reduxjs/toolkit'
import { WritableDraft } from 'immer'
import { v4 as uuidv4 } from 'uuid'
import { QuizModes, QuizState, QuizType, QuizWord } from './quiz.reducer'
import { WordType } from '@/modules/dictionaryModule/state/dictionary.reducer'

type Action = (
  state: WritableDraft<QuizState>,
  action: PayloadAction<unknown>
) => void

type QuizActionsType = {
  [key: string]: Action
}

export const quizActions: QuizActionsType = {
  setLoading: (state, action: PayloadAction<QuizType>) => {
    state.quizList.push(action.payload)
  },
  addQuiz: (state, action: PayloadAction<QuizType>) => {
    state.quizList.push(action.payload)
  },
  startLocalQuiz: (state, action: PayloadAction<WordType[]>) => {
    // const isLastIndex = state.currentWordIndex === state.words.length - 1
    console.log(action.payload, 'payload')

    const newWords: QuizWord[] = action.payload
      .sort((a, b) => Math.random() - 0.5)
      .map(el => {
        console.log(el)

        const variants = [el.translate]
        for (let i = 0; i < action.payload.length; i++) {
          if (variants.length === 3) {
            break
          }

          const word = action.payload[i]
          if (!variants.find(variant => variant === word.translate)) {
            variants.push(word.translate)
          }
        }
        return {
          word: el.title,
          translate: el.translate,
          variants,
        }
      })
    console.log(newWords)

    state.words = newWords
  },
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
    state.words = state.words.sort(() => Math.random() - 0.5)
    state.currentWordIndex = 0
    state.isLoading = false
    state.errorInWord = false
    state.isCorrectAnswer = false
    state.finished = false
  },
  changeRandomMode: state => {
    state.randomMode = Math.floor(Math.random() * 2)
  },
  changeMode: (state, action: PayloadAction<QuizModes[]>) => {
    state.mode = action.payload
  },
}
