import { RootState } from '@/store/store'

export const quizWordsSelector = (state: RootState) => state.quiz.words
export const quizLoadingSelector = (state: RootState) => state.quiz.isLoading
export const quizCurrentWordIndexSelector = (state: RootState) =>
  state.quiz.currentWordIndex
export const quizIsErrorInWordSelector = (state: RootState) =>
  state.quiz.errorInWord
export const quizIsCorrectAnswerSelector = (state: RootState) =>
  state.quiz.isCorrectAnswer
export const quizFinishedSelector = (state: RootState) => state.quiz.finished
export const quizModeSelector = (state: RootState) => state.quiz.mode
export const randomModeSelector = (state: RootState) => state.quiz.randomMode