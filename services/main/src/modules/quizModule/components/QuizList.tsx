import { Box, Button, Card, CardActions, CardContent } from '@mui/material'
import React, { useEffect } from 'react'
import s from '../quiz.module.scss'
import { useNavigate } from 'react-router-dom'
import { QuizModes } from '../state/quiz.reducer'
import { useDispatch } from 'react-redux'

interface Props {
  quizList?: {
    id: number
    title: string
  }[]
  isLoading: boolean
}

interface QuizListContainerProps {
  addQuizHandler: any
  quizMode: QuizModes
}

interface QuizCardProps {
  title: string
  id: string
}

export const QuizCard: React.FC<QuizCardProps> = ({ id, title }) => {
  const navigate = useNavigate()

  return (
    <Card sx={{ maxWidth: 275, width: '100%', height: 100 }}>
      <CardContent>
        <Box>{title}</Box>
      </CardContent>
      <CardActions>
        <Button onClick={() => navigate(`/quiz/${id}`)} size="small">
          Open
        </Button>
      </CardActions>
    </Card>
  )
}

// export const QuizListContainer: React.FC<QuizListContainerProps> = ({
//   quizMode,
// }) => {

//   async function addQuizHandler() {

//   }

//   return <QuizList />
// }

export const QuizList: React.FC<Props> = ({ quizList, isLoading }) => {
  useEffect(() => {
    console.log(quizList)
  }, [quizList])

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          columnGap: '30px',
          rowGap: '20px',
          //   justifyContent: 'space-between',
        }}
      >
        {quizList.length === 0 && <Box>No quizzes</Box>}
        <QuizCard title="some" id="1" />
        <QuizCard title="some" id="1" />
        <QuizCard title="some" id="1" />
        <QuizCard title="some" id="1" />
        <QuizCard title="some" id="1" />
      </Box>
    </>
  )
}
