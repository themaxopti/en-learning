import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material'
import { WrapperContainer } from '@packages/shared/src/components/wrapper/Wrapper/WrapperContainer'
import React, { useRef, useState } from 'react'
import s from '../quiz.module.scss'
import { CheckBoxSelect } from '@/components/CheckBoxSelect/CheckBoxSelect'
import { WordsQuiz, WordsQuizContainer } from '../components/WordsQuiz'
import { useDispatch } from 'react-redux'
import { changeMode } from '../state/quiz.reducer'
interface Props {}

export const LocalQuizPage: React.FC<Props> = ({}) => {
  const [dictionaryOptions, setDictionaryOptions] = useState(['some', 'any'])
  const [options, setOptions] = useState(['write', 'choose'])

  const [selectedDictionaryOptions, setSelectedDictionaryOptions] = useState([])
  const [selectedOptions, setSelectedOptions] = useState(['choose'])

  const dispatch = useDispatch()

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event
    console.log(value)

    if (value.length === 0) {
      return
    }

    // if (selectedOptions.length === 1) {
    //   const isSelectedItem = selectedOptions.find(el => el === value[0])
    //   console.log(isSelectedItem, 'sss')
    // }
    dispatch(changeMode(value))
    setSelectedOptions(typeof value === 'string' ? value.split(',') : value)
  }


  return (
    <>
      <WrapperContainer fullHeight>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            alignItems: 'center',
          }}
        >
          <Box className={s['quiz-control__settings']}>
            <CheckBoxSelect
              className={s['quiz-control__field']}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
              label="Mode"
              options={options}
              handleChange={handleChange}
            />
          </Box>
          <WordsQuizContainer />
        </Box>
      </WrapperContainer>
    </>
  )
}
