import React, {
  useEffect,
  useState,
  createContext,
  useRef,
  useContext,
} from 'react'
import { Wrapper } from './Wrapper'
import { useSelector, useDispatch } from 'react-redux'
// import {
//   headerRefSelector,
//   dictionaryControllRefSelector,
//   isDictionaryControllFixedSelector,
// } from '@state/reducers/componentsProperties/selectors'
import { isDictionaryControllFixedSelector } from '../../../state/reducers/componentsProperties/selectors'

import { setDictionaryControllFixed as setDictionaryControllFixedRedux } from '../../../state/reducers/componentsProperties/componentsProperties.reducer'
// import { } from '@state/reducers/'

interface Props {
  children: any
  fullHeight?: boolean
}

const RefContext = createContext(null)

export const useRefs = () => {
  return useContext(RefContext)
}

export const WrapperContainer: React.FC<Props> = ({
  children,
  fullHeight = false,
}) => {
  const headerRef = useRef(null)
  const dictionaryControllRef = useRef(null)
  console.log('render')

  const [isDictionaryControllFixed, setIsDictionaryControllFixed] =
    useState<boolean>(false)

  useEffect(() => {
    // window.addEventListener('scroll', handleScroll)
    // handleScroll() 
    return () => {
    //   window.removeEventListener('scroll', handleScroll)
    }
  }, [])


  return (
    <RefContext.Provider
      value={{ element1Ref: headerRef, element2Ref: dictionaryControllRef, isDictionaryControllFixed }}
    >
      <Wrapper fullHeight={fullHeight}>{children}</Wrapper>
    </RefContext.Provider>
  )
}
