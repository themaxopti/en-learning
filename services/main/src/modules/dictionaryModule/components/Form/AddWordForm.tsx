import { Box, Button, Modal, TextareaAutosize, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import s from '../../styles/DictionaryPage.module.scss'
import { useDispatch } from 'react-redux'
import { addManyWords, addWord } from '../../state/dictionary.reducer'
import { useSelector } from 'react-redux'
import { wordsSelector } from '../../state/selectors'
import { convertStrToArray } from '../../utils/helpers'
import { v4 as uuidv4 } from 'uuid'
// import { setTestRef } from '@packages/shared/src/state/reducers/componentsProperties/componentsProperties.reducer'

interface Props {}

type WordTranslate = { word: string; translate: string }

export const AddWordForm: React.FC<Props> = ({}) => {
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const [manyWordsValue, setManyWordsValue] = useState('')
  const [errorMsg, seterrorMsg] = useState('')

  const words = useSelector(wordsSelector)

  const formik = useFormik({
    initialValues: {
      word: '',
      translate: '',
    },
    onSubmit: values => {
      dispatch(
        addWord({
          checked: false,
          index: words.length,
          translate: values.translate,
          word: `${values.word} ${uuidv4()}`,
        })
      )
      values.word = ''
      values.translate = ''
    },
    validate: values => {
      const errors: any = {}
      if (!values.translate) {
        errors.translate = 'Required'
        return errors
      }
      if (!values.word) {
        errors.word = 'Required'
        return errors
      }
    },
  })

  function handleAddManyWords() {
    const wordsAndTranslates: WordTranslate[] | boolean = convertStrToArray(
      manyWordsValue.trim()
    )
    console.log(wordsAndTranslates)

    if (wordsAndTranslates === false) {
      seterrorMsg('Write in proper format')
      return
    }

    if (wordsAndTranslates.length === 0) {
      seterrorMsg('Write some words')
      return
    }

    dispatch(addManyWords(wordsAndTranslates))

    setTimeout(() => {
      setOpen(false)
    }, 1000)
  }

  return (
    <>
      <Box>
        <form  onSubmit={formik.handleSubmit}>
          <Box className={s['add-word-form']}>
            <Button
              onClick={() => setOpen(true)}
              size="small"
              variant="contained"
            >
              Add many words
            </Button>
            <Box className={s['add-word-form__one-word']}>
              <TextField
                size="small"
                className={s['add-word-form__field']}
                onChange={formik.handleChange}
                value={formik.values.word}
                name="word"
                fullWidth={true}
                label="Word"
                variant="outlined"
              />
              <TextField
                size="small"
                className={s['add-word-form__field']}
                onChange={formik.handleChange}
                value={formik.values.translate}
                name="translate"
                fullWidth={true}
                label="Word"
                variant="outlined"
              />
              <Button
                className={s['add-word-form__btn']}
                type="submit"
                variant="contained"
                size="small"
              >
                Add
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
      <Modal
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        open={open}
        onClose={() => {
          setOpen(false)
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={s['add-many-words']}>
          <Box>
            <h3>Add words in format:</h3>
            <p>word translate word translate word translate,translate</p>
            <p>word-translate word-translate word-translate,translate</p>
            <p>word-translate,word-translate,word-translate,translate</p>
            <p style={{ marginTop: '5px' }}>
              <strong>
                {' '}
                you can paste words with many spaces and application will add
                them to the dictionary{' '}
              </strong>{' '}
            </p>
          </Box>
          {errorMsg && <Box sx={{ color: 'red' }}>{errorMsg}</Box>}

          <TextareaAutosize
            value={manyWordsValue}
            onChange={e => setManyWordsValue(e.target.value)}
          />
          <Button onClick={handleAddManyWords} variant="contained">
            Add
          </Button>
        </Box>
      </Modal>
    </>
  )
}
