import { Box, TextField } from '@mui/material'
import { WrapperContainer } from '@packages/shared/src/components/wrapper/Wrapper/WrapperContainer'
import React from 'react'
import { QizzesControll } from '../components/QizzesControll'
import { QuizList } from '../components/QuizList'
interface Props {}

export const QuizzesPage: React.FC<Props> = ({}) => {

  

  return (
    <>
      <WrapperContainer>
        <h1 style={{ marginBottom: '40px' }}>Your quizzes</h1>
        <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '50px' }}>
          <QizzesControll />
          {/* @ts-ignore */}
          <QuizList quizList={[]} />
        </Box>
      </WrapperContainer>
    </>
  )
}
