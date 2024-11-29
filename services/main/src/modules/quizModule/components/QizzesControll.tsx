import { CheckBoxSelect } from '@/components/CheckBoxSelect/CheckBoxSelect'
import {
  Box,
  Button,
  Checkbox,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import React, { useState } from 'react'
import s from '../quiz.module.scss'
import { QuizList } from './QuizList'
import { useDispatch } from 'react-redux'

interface Props {}

export const QizzesControll: React.FC<Props> = ({}) => {
  const dispatch = useDispatch()

  const [dictionaryOptions, setDictionaryOptions] = useState(['some', 'any'])
  const [options, setOptions] = useState(['read', 'write', 'choose'])
  const [selectedDictionaryOptions, setSelectedDictionaryOptions] = useState([])
  const [selectedOptions, setSelectedOptions] = useState([])

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event
    console.log(value)

    if (value.length === 0) {
      return
    }

    if (selectedOptions.length === 1) {
      const isSelectedItem = selectedOptions.find(el => el === value[0])
      console.log(isSelectedItem, 'sss')
    }
    setSelectedOptions(typeof value === 'string' ? value.split(',') : value)
  }

  async function addQuizHandler() {
      // dispatch
  }

  return (
    <>
      <Box className={s['quiz-control']}>
        <TextField
          className={s['quiz-control__field']}
          variant="standard"
          size="small"
          label="Quiz name"
        />
        <CheckBoxSelect
          handleChange={handleChange}
          className={s['quiz-control__field']}
          selectedOptions={selectedDictionaryOptions}
          setSelectedOptions={setSelectedDictionaryOptions}
          label="Select dictionary"
          options={dictionaryOptions}
        />
        <CheckBoxSelect
          handleChange={handleChange}
          className={s['quiz-control__field']}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          label="Options"
          options={options}
        />
        <Button
          sx={{
            marginTop: 'auto',
            maxWidth: '200px',
            width: '100%',
          }}
          onClick={() => {
            console.log(selectedDictionaryOptions, selectedOptions)
          }}
          variant="outlined"
        >
          Add quiz
        </Button>
      </Box>
    </>
  )
}
