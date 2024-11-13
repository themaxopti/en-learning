import { Box, Button, Card, CardActions, CardContent } from '@mui/material'
import React from 'react'
import s from '../quiz.module.scss'
import { useNavigate } from 'react-router-dom'

interface Props {
  quizzes: {
    link: string
    title: string
  }[]
}

interface QuizCardProps {
  title: string
  id: string
}

export const QuizCard: React.FC<QuizCardProps> = ({ id, title }) => {
  const navigate = useNavigate()

  return (
    <Card
      sx={{ maxWidth: 275, width: '100%', height: 100 }}
    >
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

export const QuizList: React.FC<Props> = ({ quizzes }) => {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          columnGap:'30px',
          rowGap:'20px'
          //   justifyContent: 'space-between',
        }}
      >
        <QuizCard title="some" id="1" />
        <QuizCard title="some" id="1" />
        <QuizCard title="some" id="1" />
        <QuizCard title="some" id="1" />
        <QuizCard title="some" id="1" />
      </Box>
    </>
  )
}
