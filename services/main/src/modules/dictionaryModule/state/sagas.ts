import { delay, put, select, takeEvery, takeLatest } from "redux-saga/effects";
import { addManyWords, addWord, changeIndex, DictionaryType, removeSelectedItems, removeWord, setCurrentDictionary, setDictionaries, setDictionariesLoading, setIsDictionaryExist, setNewWordsAmount, setNewWordsPending, setWords, setWordsLoading } from "./dictionary.reducer";
import { CreateWordRes, CreateWordsRes, DeleteWordRes, DeleteWordsRes, GetDictionariesRes, GetDictionaryRes, GetWordsRes } from "../api/dictionary-api.dto";
import { dictionaryApi } from "../api/dictionary-api";
import { changedIndexesHelper, sortWordsByIndex } from "../utils/helpers";
import { currentDictionarySelector, wordsSelector } from "./selectors";
import { v4 as uuidv4 } from 'uuid';

export const GET_DICTIONARIES = "GET_DICTIONARIES"
export const CREATE_DICTIONARY = "CREATE_DICTIONARY"
export const GET_WORDS = "GET_WORDS"
export const CREATE_WORD = "CREATE_WORD"
export const CREATE_WORDS = "CREATE_WORDS"
export const DELETE_WORDS = "DELETE_WORDS"
export const DELETE_WORD = "DELETE_WORD"
export const CHANGE_WORDS_INDEX = "CHANGE_WORDS_INDEX"


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

export interface ChangeWordsIndexesSagaParam {
    type: typeof DELETE_WORD
    payload: {
        wordsIndexes: { id: number, indexWillBe: number }[]
    }
}

export function* getDictionariesSaga({ payload: { limit, page } }: GetDictionariesSagaParam) {
    try {
        console.log('get dictionar');
        
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

export function* createDictionarySaga({ payload: { limit, page } }: GetDictionariesSagaParam) {
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
        console.log('here');

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
            yield put(setWords([]))
            yield put(setWordsLoading(false));
            return
        }

        const changedWords = wordsResponse.data.map(el => {
            return { ...el, title: `${el.title} ${uuidv4()}`, checked: false }
        })

        yield put(setWords(sortWordsByIndex(changedWords) as any));
        yield put(setWordsLoading(false));
    } catch (error) {
        throw error
    }
}


export function* createWordSaga({ payload: { title, translate } }: CreateWordSagaParam) {
    try {
        const dictionary: DictionaryType = yield select(currentDictionarySelector)

        yield put(setNewWordsPending(true))
        yield put(setNewWordsAmount(1))

        const response: CreateWordRes = yield dictionaryApi.createWord({ dictionaryId: dictionary.id, title, translate })
        console.log(response.data, 'reduxx');

        if (response.statusCode !== 200) {
            yield put(setNewWordsPending(false))
            yield put(setNewWordsAmount(0))
            return
        }


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
        const dictionary: DictionaryType = yield select(currentDictionarySelector)

        yield put(setNewWordsPending(true))
        yield put(setNewWordsAmount(payload.words.length))
        const response: CreateWordsRes = yield dictionaryApi.createWords({ words: payload.words, dictionaryId: dictionary.id })

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
        const dictionary: DictionaryType = yield select(currentDictionarySelector)

        const response: DeleteWordRes = yield dictionaryApi.deleteWord({ id: payload.id, dictionaryId: dictionary.id })
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
        const response: DeleteWordsRes = yield dictionaryApi.deleteWords(payload)
        yield put(removeSelectedItems({}))
    } catch (error) {
        throw error
    }
}

export function* changeWordsIndexesSaga({ }: ChangeWordsIndexesSagaParam) {
    try {
        const words: ReturnType<typeof wordsSelector> = yield select(wordsSelector)
        const wordsCopy = [...words].map(el => {
            return { ...el }
        })
        yield put(changeIndex({}))
        const { arrayWithChangedIndexes, changedIndexes } = changedIndexesHelper(wordsCopy)
        const response: DeleteWordsRes = yield dictionaryApi.changeWordsIndexes({ wordsIndexes: changedIndexes })
        console.log(response.statusCode);
    } catch (error) {
        throw error
    }
}

export function* watchGetDictionariesSaga() {
    yield takeLatest(GET_DICTIONARIES, getDictionariesSaga);
}

export function* watchCreateDictionarySaga() {
    yield takeLatest(CREATE_DICTIONARY, createDictionarySaga);
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

export function* watchChangeWordsIndexesSaga() {
    yield takeLatest(CHANGE_WORDS_INDEX, changeWordsIndexesSaga);
}

export const dictionarySagas: any[] = []
export const dictionarySagasWathcers: any[] = [
    watchChangeWordsIndexesSaga,
    watchDeleteWordsSaga,
    watchDeleteWordSaga,
    watchGetWordsSaga,
    watchCreateWordSaga,
    watchCreateWordsSaga,
    watchGetDictionariesSaga
    // takeEvery( watchChangeWordsIndexesSaga),
    // takeEvery(watchDeleteWordsSaga),
    // takeEvery(watchDeleteWordSaga),
    // takeEvery(watchGetWordsSaga),
    // takeEvery(watchCreateWordSaga),
    // takeEvery(watchCreateWordsSaga),
]
export const dictionarySagasWathcersRun: any = function (){
    return dictionarySagasWathcers.map(el => el())
    // for (let i = 0; i < params.length; i++) {
    //     const saga = params[i];
    //     saga()
    // }
}



dictionarySagas.push(
    getDictionariesSaga,
    createDictionarySaga,
    getWordsSaga,
    createWordSaga,
    createWordsSaga,
    deleteWordSaga,
    deleteWordsSaga,
    changeWordsIndexesSaga,
    watchGetDictionariesSaga,
    watchCreateDictionarySaga
)
