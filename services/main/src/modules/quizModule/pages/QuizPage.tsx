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
interface Props {}

export const QuizPage: React.FC<Props> = ({}) => {
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
              selectedOptions={[]}
              setSelectedOptions={[]}
              label="Mode"
              options={[]}
            />
          </Box>
          <WordsQuizContainer />
        </Box>
      </WrapperContainer>
    </>
  )
}
