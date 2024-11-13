import { Box, Checkbox, Skeleton } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import s from '../../styles/DictionaryPage.module.scss'
import Draggable, { DraggableCore } from 'react-draggable'
import { Reorder, useDragControls } from 'framer-motion'
import { useMotionValue } from 'framer-motion'
import { DictionaryControl } from './DictionaryControl'
import { useSelector } from 'react-redux'
import {
  currentDictionarySelector,
  selectMode,
  uuidWordsSelector,
  wordsSelector,
} from '../../state/selectors'
import { v4 as uuidv4 } from 'uuid'
import {
  // CHANGE_WORDS_INDEX,
  changeIndex,
  // changeWordsIndexesSaga,
  // DELETE_WORD,
  // DeleteWordSagaParam,
  removeWord,
  reorder,
  selectItem,
  WordType as WordType,
} from '../../state/dictionary.reducer'
import { useDispatch } from 'react-redux'
import { handleUuidWord } from '../../utils/helpers'
import { CHANGE_WORDS_INDEX, DELETE_WORD } from '../../state/sagas'
import { setDictionaryControllWidth } from '@packages/shared/src/state/reducers/componentsProperties/componentsProperties.reducer'

interface Props {
  item: WordType
  i: number
  //   isWordsLoading: boolean
}

export const Word = ({ item, i }: Props) => {
  const y = useMotionValue(0)
  const dragControls = useDragControls()
  const selectedMode = useSelector(selectMode)
  const dispatch = useDispatch()

  const [isDraggable, setIsDraggable] = useState(true)

  const [isControlItem, setIsControlItem] = useState(false)
  const [isControlItemTranslate, setIsControlItemTranslate] = useState(false)

  const [newWord, setNewWord] = useState(handleUuidWord(item.title))
  const [newTranslate, setNewTranslate] = useState(item.translate)

  const currentDictionary = useSelector(currentDictionarySelector)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    str: 'word' | 'translate'
  ) {
    // if (e.target.value === '') return
    // if (newWord.length === 1) {
    //   setNewWord(newWord + e.target.value)
    //   return
    // }
    if (str === 'word') {
      setNewWord(e.target.value)
    }
    if (str === 'translate') {
      setNewTranslate(e.target.value)
    }
  }

  async function deleteWordHandler() {
    dispatch({
      type: DELETE_WORD,
      payload: {
        dictionaryId: currentDictionary.id,
        i,
        id: item.id,
      },
    })
  }

  return (
    <Reorder.Item
      value={item}
      style={{ y, listStyle: 'none', padding: '0px' }}
      dragControls={dragControls}
      onDragEnd={(event, info) => dispatch({ type: CHANGE_WORDS_INDEX })}
      draggable={isDraggable}
    >
      <div data-testid="word" className={s['word']}>
        <Box
          className={s['word__title']}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          {selectedMode && (
            <Checkbox
              sx={{
                padding: 0,
                transform: 'translateX(-3px)',
              }}
              onClick={() => dispatch(selectItem(item))}
              checked={item.checked}
            />
          )}
          <Box
            onClick={() => setIsControlItem(prev => !prev)}
            sx={{
              position: 'relative',
              fontWeight: isControlItem && 'bold',
              ml: selectedMode ? '5px' : '0px',
            }}
          >
            {newWord}
          </Box>
          {isControlItem && (
            <Box
              onClick={e => {
                e.stopPropagation()
              }}
              className={s['word__control']}
            >
              <input
                type="text"
                value={newWord}
                onChange={e => handleChange(e, 'word')}
              />
              <Box onClick={deleteWordHandler} className={s['word__delete']}>
                Delete
              </Box>
            </Box>
          )}
        </Box>

        <Box className={s['word__title']}>
          <Box
            sx={{
              position: 'relative',
              fontWeight: isControlItemTranslate && 'bold',
            }}
            onClick={() => setIsControlItemTranslate(prev => !prev)}
          >
            {newTranslate}
          </Box>
          {isControlItemTranslate && (
            <Box
              onClick={e => {
                e.stopPropagation()
              }}
              className={s['word__control']}
            >
              <input
                type="text"
                value={newTranslate}
                onChange={e => handleChange(e, 'translate')}
              />
              <Box
                onClick={e => {
                  dispatch(removeWord(i))
                }}
                className={s['word__delete']}
              >
                Delete
              </Box>
            </Box>
          )}
        </Box>
      </div>
    </Reorder.Item>
  )
}

export const WordSkelet = ({}) => {
  return (
    <div className={s['word']}>
      <Box className={s['word__title']}>
        <Skeleton variant="text" width={200} height={30} />
      </Box>

      <Box className={s['word__title']}>
        <Skeleton variant="text" width={200} height={30} />
      </Box>
    </div>
  )
}

interface WordsProps {
  isWordsLoading: boolean
  newWordsPending: boolean
  newWordsAmount: number
}

export const Words: React.FC<WordsProps> = ({
  isWordsLoading,
  newWordsAmount,
  newWordsPending,
}) => {
  console.log(newWordsAmount, newWordsPending)

  const words = useSelector(wordsSelector)
  //   const [items, setItems] = useState(words)
  const [skeletons, setSkeletons] = useState([1, 2, 3, 4])

  //   useEffect(() => {}, [items])
  const dispatch = useDispatch()

  return (
    <Reorder.Group
      style={{ padding: '0px', listStyle: 'none' }}
      axis="y"
      onReorder={el => dispatch(reorder(el))}
      values={words}
    >
      {isWordsLoading
        ? skeletons.map((el, i) => <WordSkelet />)
        : words.map((item, i: number) => (
            <Word key={item.title} i={i} item={item} />
          ))}

      {newWordsPending &&
        new Array(newWordsAmount).fill(0).map(el => <WordSkelet />)}
    </Reorder.Group>
  )
}

export const Dictionary: React.FC<{
  isWordsLoading: boolean
  newWordsAmount: number
  newWordsPending: boolean
}> = ({ isWordsLoading, newWordsAmount, newWordsPending }) => {
  const dictionaryWrapperRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (dictionaryWrapperRef.current) {
      dispatch(
        setDictionaryControllWidth(
          dictionaryWrapperRef.current.getBoundingClientRect().width + 'px'
        )
      )
    }
  }, [dictionaryWrapperRef.current])

  return (
    <>
      <DictionaryControl />
      <Box ref={dictionaryWrapperRef} className={s['words']}>
        <Words
          newWordsAmount={newWordsAmount}
          newWordsPending={newWordsPending}
          isWordsLoading={isWordsLoading}
        />
      </Box>
      <div style={{ height: '1000px', width: '100px' }}></div>
    </>
  )
}
