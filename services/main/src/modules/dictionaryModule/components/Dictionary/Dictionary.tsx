import { Box, Checkbox } from '@mui/material'
import React, { useEffect, useState } from 'react'
import s from '../../styles/DictionaryPage.module.scss'
import Draggable, { DraggableCore } from 'react-draggable'
import { Reorder, useDragControls } from 'framer-motion'
import { useMotionValue } from 'framer-motion'
import { DictionaryControl } from './DictionaryControl'
import { useSelector } from 'react-redux'
import { selectMode, wordsSelector } from '../../state/selectors'
import { v4 as uuidv4 } from 'uuid'
import {
    changeIndex,
    removeWord,
    reorder,
    selectItem,
    Word as WordType,
} from '../../state/dictionary.reducer'
import { useDispatch } from 'react-redux'
import { handleUuidWord } from '../../utils/helpers'

interface Props {
    item: WordType
    i: number
}

export const Word = ({ item, i }: Props) => {
    const y = useMotionValue(0)
    const dragControls = useDragControls()
    const selectedMode = useSelector(selectMode)
    const dispatch = useDispatch()

    const [isDraggable, setIsDraggable] = useState(true)

    const [isControlItem, setIsControlItem] = useState(false)
    const [isControlItemTranslate, setIsControlItemTranslate] = useState(false)

    const [newWord, setNewWord] = useState(handleUuidWord(item.word))
    const [newTranslate, setNewTranslate] = useState(item.translate)

    // useEffect(() => {
    //     setIsControlItem((prev) => !prev)
    // }, [isDraggable])

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement>,
        str: 'word' | 'translate'
    ) {
        if (e.target.value === '') return
        if (newWord.length === 1) {
            setNewWord(newWord + e.target.value)
            return
        }
        if (str === 'word') {
            setNewWord(e.target.value)
        }
        if (str === 'translate') {
            setNewTranslate(e.target.value)
        }
    }

    function deleteItem() {
        // dispatch(delet)
    }

    return (
        <Reorder.Item
            value={item}
            style={{ y, listStyle: 'none', padding: '0px' }}
            dragControls={dragControls}
            onDragEnd={(event, info) => dispatch(changeIndex(item))}
            draggable={isDraggable}
        >
            <div className={s['word']}>
                <Box
                    className={s['word__title']}
                    sx={{ display: 'flex', alignItems: 'center' }}
                >
                    {selectedMode && (
                        <Checkbox
                            onClick={() => dispatch(selectItem(item))}
                            checked={item.checked}
                        />
                    )}
                    <Box
                        onClick={() => setIsControlItem(prev => !prev)}
                        sx={{
                            position: 'relative',
                            fontWeight: isControlItem && 'bold',
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
                            <Box
                                onClick={e => dispatch(removeWord(i))}
                                className={s['word__delete']}
                            >
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

export function Words() {
    const words = useSelector(wordsSelector)
    const [items, setItems] = useState(words)

    useEffect(() => {
    }, [items])
    const dispatch = useDispatch()

    return (
        <Reorder.Group
            style={{ padding: '0px', listStyle: 'none' }}
            axis="y"
            onReorder={el => dispatch(reorder(el))}
            values={words}
        >
            {words.map((item, i: number) => (
                <Word key={item.word} i={i} item={item} />
            ))}
        </Reorder.Group>
    )
}

export const Dictionary: React.FC<{}> = ({ }) => {
    return (
        <>
            <DictionaryControl />
            <Box className={s['words']}>
                <Words />
            </Box>
      <div style={{height:'1000px',width:'100px'}}></div>

        </>
    )
}
