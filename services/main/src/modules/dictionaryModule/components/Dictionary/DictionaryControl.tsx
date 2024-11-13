import { Box } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  removeSelectedItems,
  setSelectAllMode,
  setSelectMode,
} from '../../state/dictionary.reducer'
import { useSelector } from 'react-redux'
import {
  currentDictionarySelector,
  isSelectedAllMode,
  selectMode,
  wordsSelector,
} from '../../state/selectors'
import { RefContextType, useRefs } from '@packages/shared/src/components/wrapper/Wrapper/WrapperContainer'
import { DELETE_WORDS } from '../../state/sagas'
import s from '../../styles/DictionaryPage.module.scss'
import SettingsIcon from '@mui/icons-material/Settings'
import { DescriptionModal } from '../Modals/DescriptionModal'
import { dictionaryControllWidthSelector } from '@packages/shared/src/state/reducers/componentsProperties/selectors'
import { setDictionaryControllWidth } from '@packages/shared/src/state/reducers/componentsProperties/componentsProperties.reducer'

interface Props {}

export const DictionaryControl: React.FC<Props> = React.memo(({}) => {
  const dispatch = useDispatch()

  const [openDescModal, setOpenDescModal] = useState(false)
  const selectedMode = useSelector(selectMode)
  const selectedAllMode = useSelector(isSelectedAllMode)
  const words = useSelector(wordsSelector)
  const currentDictionary = useSelector(currentDictionarySelector)
  const dictionaryControllWidth = useSelector(dictionaryControllWidthSelector)

  const { headerRef, dictionaryControllRef }: RefContextType = useRefs()

  const [isDictionaryControllFixed, setIsDictionaryControllFixed] =
    useState(false)

  console.log('render')

  async function deleteManyWordsHandler() {
    const selectedWords = words
      .filter(word => {
        return word.checked === true
      })
      .map(el => {
        return {
          id: el.id,
        }
      })

    dispatch({
      type: DELETE_WORDS,
      payload: { dictionaryId: currentDictionary.id, wordsId: selectedWords },
    })
  }

  const handleScroll = () => {
    if (headerRef.current && dictionaryControllRef.current) {
      const targetRect = dictionaryControllRef.current.getBoundingClientRect()
      const rootRect = headerRef.current.getBoundingClientRect()

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

  useEffect(() => {
    const handleResize = (entries:any) => {
      for (let entry of entries) {
        dispatch(setDictionaryControllWidth(`${entry.contentRect.width}px`)) // Устанавливаем новую ширину
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    
    if(dictionaryControllRef.current){
      resizeObserver.observe(dictionaryControllRef.current);
    }

    return () => {
      resizeObserver.disconnect(); // Отключаем наблюдение при размонтировании
    };
  }, [dictionaryControllRef.current])

  // const controllRef = useRef(null)

  return (
    <>
      <div ref={dictionaryControllRef} style={{ marginTop: '20px' }}>
        <div
          style={{
            height: '22.4px',
            maxWidth: '1400px',
            width: '100%',
            background: '#F5F6FA',
            display: isDictionaryControllFixed ? 'block' : 'none',
          }}
          // ref={controllRef}
        >
          1
        </div>
        <Box
          className={s.dictionary__control}
          sx={{
            position: isDictionaryControllFixed ? 'fixed' : 'static',
            top: isDictionaryControllFixed ? '60px' : '0',
            maxWidth: dictionaryControllWidth,
            width: '100%',
          }}
        >
          <Box onClick={() => dispatch(setSelectMode(!selectedMode))}>
            Select
          </Box>
          {selectedMode && (
            <Box
              sx={{ textDecoration: selectedAllMode ? 'underline' : 'none' }}
              onClick={() => dispatch(setSelectAllMode({}))}
            >
              All
            </Box>
          )}
          <Box onClick={deleteManyWordsHandler}>Delete</Box>
          <Box sx={{ display: 'flex', columnGap: '5px', marginLeft: 'auto' }}>
            <Box>
              <SettingsIcon
                onClick={() => setOpenDescModal(prev => !prev)}
                sx={{ cursor: 'pointer', width: 18, height: 18 }}
              />
            </Box>
            <Box>2</Box>
            <Box>3</Box>
          </Box>
        </Box>
      </div>
      <DescriptionModal open={openDescModal} setOpen={setOpenDescModal} />
    </>
  )
})
