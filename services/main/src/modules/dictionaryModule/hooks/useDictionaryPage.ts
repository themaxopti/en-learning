import { useAuth } from "@/modules/authModule/hooks/authHook";
import { authLoadingSelector, isAuthSelector } from "@/modules/authModule/state/selectors";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dictionaryApi } from "../api/dictionary-api";
import { userSelector } from "@/modules/userModule/state/selectors";
import { useDispatch } from "react-redux";
// import { GET_DICTIONARIES, GET_WORDS } from "../state/dictionary.reducer";
import { dictionariesCardsSelector, isDictionariesLoadingSelector, isDictionaryExistSelector, isWordsLoadingSelector, newWordsAmountSelector, newWordsPendingSelector } from "../state/selectors";
import { delay } from '@packages/shared/src/utils/delay'
import { useParams } from "react-router-dom";
import { GET_WORDS } from "../state/sagas";

export function useDictionaryPage() {
    let { id } = useParams();
    const dispatch = useDispatch()
    const { isAuth, authLoading } = useAuth({ redirect: true })
    const isDictionariesLoading = useSelector(isDictionariesLoadingSelector)
    const isWordsLoading = useSelector(isWordsLoadingSelector)
    const cards = useSelector(dictionariesCardsSelector)
    const isDictionaryExist = useSelector(isDictionaryExistSelector)
    const newWordsPending = useSelector(newWordsPendingSelector)
    const newWordsAmount = useSelector(newWordsAmountSelector)


    async function getWords() {
        if (authLoading === false && isAuth) {
            console.log('we try');
            
            // await delay(2000)
            dispatch({ type: GET_WORDS, payload: { limit: 1, page: 1, dictionaryId: id } })
        }
    }

    useEffect(() => {
        getWords()
    }, [authLoading])

    return {
        cards, isDictionariesLoading, isDictionaryExist, isWordsLoading,
        newWordsPending, newWordsAmount
    }
}