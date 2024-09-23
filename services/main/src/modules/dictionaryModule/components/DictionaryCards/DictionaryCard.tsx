import { Box, Skeleton } from '@mui/material'
import React from 'react'
import s from '../../styles/DictionaryCard.module.scss'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

interface Props {
  title: string
  id: number
}

export const DictionaryCard: React.FC<Props> = ({ title,id }) => {
  const navigate = useNavigate()

  return (
    <>
      <Card sx={{ maxWidth: 275, width: '100%', height: 100 }}>
        <CardContent>
          <Box>{title}</Box>
        </CardContent>
        <CardActions>
          <Button onClick={() => navigate(`/dictionary/${id}`)} size="small">
            Open
          </Button>
        </CardActions>
      </Card>
    </>
  )
}

export const DictionaryCardSkelet = () => {
  return (
    <>
      <Card sx={{ maxWidth: 275, width: '100%', height: 100 }}>
        <CardContent>
          <Box>
            <Skeleton variant="rectangular" sx={{ width: 100, height: 20 }} />
          </Box>
        </CardContent>
        <CardContent>
          <Box>
            <Skeleton variant="rectangular" sx={{ width: 50, height: 20 }} />
          </Box>
        </CardContent>
      </Card>
      {/* <Box style={{ maxWidth: 275, width: '100%', height: 100 }}>
        <Skeleton variant="rectangular" sx={{ width: '100%', height: '100%' }} />
      </Box> */}
    </>
  )
}
