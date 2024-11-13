import { delay, put, select, takeEvery, takeLatest } from 'redux-saga/effects'
import {
  changeErrorInWordState,
  checkWord,
  countWordIndex,
  setIsCorrectAnswer,
} from './quiz.reducer'
import { quizIsErrorInWordSelector } from './quiz.selectors'

export enum QuizActions {
  CHECK_WORD = 'CHECK_WORD',
  CHECK_INPUT_WORD = 'CHECK_INPUT_WORD',
}

export interface CheckWordSagaParam {
  type: typeof QuizActions.CHECK_WORD
  payload: {
    word: string
  }
}

export function checkWordSaga_A_C(payload: string) {
  return {
    type: QuizActions.CHECK_WORD,
    payload: {
      word: payload,
    },
  }
}

export function checInputkWordSaga_A_C(payload: string) {
    return {
      type: QuizActions.CHECK_INPUT_WORD,
      payload: {
        word: payload,
      },
    }
  }
// export const CHECK_WORD = 'CHECK_WORD'

export function* checkWordSaga({ payload: { word } }: CheckWordSagaParam) {
  console.log(word, 'wodr')

  try {
    yield put(checkWord(word))
    const isErrorWord: boolean = yield select(quizIsErrorInWordSelector)
    if (isErrorWord) {
      yield put(setIsCorrectAnswer(true))
      yield delay(1000)
      yield put(changeErrorInWordState(false))
      yield put(setIsCorrectAnswer(false))
      yield put(countWordIndex({}))
      return
    }
    yield put(setIsCorrectAnswer(true))
    yield delay(1000)
    yield put(setIsCorrectAnswer(false))
    yield put(countWordIndex({}))
  } catch (error) {
    throw error
  }
}

export function* checkInputWordSaga({ payload: { word } }: ReturnType<typeof checInputkWordSaga_A_C>) {
  try {
    yield put(changeErrorInWordState(false))
    // console.log(word);
    yield put(checkWord(word.trim()))
    // yield delay(5000)
    const isErrorWord: boolean = yield select(quizIsErrorInWordSelector)
    console.log(isErrorWord);
    if (isErrorWord) {
      yield put(changeErrorInWordState(true))
      yield delay(1000)
      yield put(changeErrorInWordState(false))
      yield put(setIsCorrectAnswer(false))
      return
    }
    console.log('no errors');
    yield put(changeErrorInWordState(false))
    yield put(setIsCorrectAnswer(true))
    yield delay(1000)
    yield put(setIsCorrectAnswer(false))
    yield put(countWordIndex({}))
  } catch (error) {
    throw error
  }
}

export function* watchCheckWordSaga() {
  yield takeLatest(QuizActions.CHECK_WORD, checkWordSaga)
}

export function* watchCheckInputWordSaga() {
  yield takeLatest(QuizActions.CHECK_INPUT_WORD, checkInputWordSaga)
}

export const quizSagasWathcers: any[] = [
  watchCheckWordSaga,
  watchCheckInputWordSaga,
]
export const quizSagasWathcersRun: any = function () {
  return quizSagasWathcers.map(el => el())
}
