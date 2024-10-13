import { useAuth } from "@/modules/authModule/hooks/authHook";
import { authLoadingSelector, isAuthSelector } from "@/modules/authModule/state/selectors";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dictionaryApi } from "../api/dictionary-api";
import { userSelector } from "@/modules/userModule/state/selectors";
import { useDispatch } from "react-redux";
// import { GET_DICTIONARIES } from "../state/dictionary.reducer";
import { dictionariesCardsSelector, isDictionariesLoadingSelector } from "../state/selectors";
import { delay } from '@packages/shared/src/utils/delay'
import { GET_DICTIONARIES } from "../state/sagas";

export function useDictionaryListPage() {
    const dispatch = useDispatch()
    const { isAuth, authLoading } = useAuth({ redirect: true })
    const isDictionariesLoading = useSelector(isDictionariesLoadingSelector)
    const cards = useSelector(dictionariesCardsSelector)

    async function getDictionaries() {
        if (authLoading === false && isAuth) {
            if(cards){
                return
            }
            await delay(2000)
            dispatch({ type: GET_DICTIONARIES, payload: { limit: 1000, page: 1 } })
        }
    }

    useEffect(() => {
        getDictionaries()
    }, [authLoading])

    return { cards, isDictionariesLoading }
}