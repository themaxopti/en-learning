import { Box } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  removeSelectedItems,
  setSelectAllMode,
  setSelectMode,
} from '../../state/dictionary.reducer'
import { useSelector } from 'react-redux'
import { isSelectedAllMode, selectMode } from '../../state/selectors'
// import { setDictionaryControllRef } from '@packages/shared/src/state/reducers/componentsProperties/componentsProperties.reducer'
import { useRefs } from '@packages/shared/src/components/wrapper/Wrapper/WrapperContainer'
import { isDictionaryControllFixedSelector } from '@packages/shared/src/state/reducers/componentsProperties/selectors'

interface Props {}

export const DictionaryControl: React.FC<Props> = React.memo(({}) => {
  const dispatch = useDispatch()
  const selectedMode = useSelector(selectMode)
  const selectedAllMode = useSelector(isSelectedAllMode)

  const ref = useRef(null)
  const { element2Ref, element1Ref } = useRefs()
  const [isDictionaryControllFixed, setIsDictionaryControllFixed] =
    useState(false)
  console.log('render')

  //   const isDictionaryControllFixed = useSelector(
  //     isDictionaryControllFixedSelector
  //   )

  //   useEffect(() => {
  //     if (ref.current) {
  //       // debugger
  //       dispatch(setDictionaryControllRef(ref.current))
  //     }
  //   }, [ref.current])

  const handleScroll = () => {
    if (element1Ref.current && element2Ref.current) {
      const targetRect = element2Ref.current.getBoundingClientRect()
      const rootRect = element1Ref.current.getBoundingClientRect()

      // Проверка на пересечение
      const isOverlap = targetRect.top < rootRect.height
      targetRect.bottom > rootRect.top

      //   console.log(targetRect, rootRect)

      if (isOverlap && !isDictionaryControllFixed) {
        setIsDictionaryControllFixed(true)
      }
      if (!isOverlap) {
        setIsDictionaryControllFixed(false)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <div ref={element2Ref}>
        <div
          style={{
            height: '25px',
            maxWidth: '1400px',
            width: '100%',
            background: '#F5F6FA',
            display: isDictionaryControllFixed ? 'block' : 'none',
          }}
        >
          1
        </div>
        <Box
          sx={{
            display: 'flex',
            position: isDictionaryControllFixed ? 'fixed' : 'static',
            top: isDictionaryControllFixed ? '60px' : '0',
            backgroundColor: '#F5F6FA',
            zIndex: '1000',
          }}
        >
          <Box onClick={() => dispatch(setSelectMode(!selectedMode))}>
            Select
          </Box>
          {selectedMode && (
            <Box
              sx={{ textDecoration: selectedAllMode ? 'underline' : 'none' }}
              onClick={() => dispatch(setSelectAllMode())}
            >
              All
            </Box>
          )}
          <Box onClick={() => dispatch(removeSelectedItems())}>Delete</Box>
        </Box>
      </div>
    </>
  )
})
