import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { authLoadingSelector, isAuthSelector } from "../state/selectors"
import { useDispatch } from "react-redux"
import { AUTH_ACITON } from "../state/auth.reducer"
import { useNavigate } from "react-router-dom"

interface Options {
    redirect?: boolean
}

export const useAuth = ({ redirect = false }: Options) => {
    const navigation = useNavigate()
    const dispatch = useDispatch()
    const isAuth = useSelector(isAuthSelector)
    const authLoading = useSelector(authLoadingSelector)
    // const [auth, setAuth] = useState(null)

    useEffect(() => {
        console.log(authLoading,isAuth,'cypress');
        
        if (authLoading === false) {
            
            if (!isAuth) {
                if (redirect) {
                    navigation('/login')
                }
            }
        }
    }, [authLoading])

    useEffect(() => {
        if (!isAuth) {
            dispatch({ type: AUTH_ACITON })
        }
    }, [])

    return { authLoading, isAuth }
}