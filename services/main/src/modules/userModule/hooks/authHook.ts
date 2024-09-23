import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { isAuthSelector } from "../state/selectors"
import { useDispatch } from "react-redux"

export const useAuth = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(isAuthSelector)

    useEffect(() => {
        if(!isAuth){
            // dispatch()
        }
    },[])

}