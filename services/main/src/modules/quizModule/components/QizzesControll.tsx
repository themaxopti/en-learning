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

interface Props {}

export const QizzesControll: React.FC<Props> = ({}) => {
  const [dictionaryOptions, setDictionaryOptions] = useState(['some', 'any'])
  const [options, setOptions] = useState(['read', 'write', 'choose'])

  const [selectedDictionaryOptions, setSelectedDictionaryOptions] = useState([])
  const [selectedOptions, setSelectedOptions] = useState([])

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
            className={s['quiz-control__field']}
            selectedOptions={selectedDictionaryOptions}
            setSelectedOptions={setSelectedDictionaryOptions}
            label="Select dictionary"
            options={dictionaryOptions}
          />
          <CheckBoxSelect
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
