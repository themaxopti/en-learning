import { Box } from '@mui/material'
import React, { useState } from 'react'
import s from '../../styles/DictionaryCard.module.scss'
import { DictionaryCard, DictionaryCardSkelet } from './DictionaryCard'
import { DictionaryType } from '../../state/dictionary.reducer'

interface Props {
  cards: DictionaryType[]
  loading: boolean
}

export const DictionaryCards: React.FC<Props> = ({ cards, loading }) => {
  const [testcards, setCards] = useState(['Some', 'Title', 'omit'])

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          columnGap: '50px',
          rowGap: '20px',
          flexWrap: 'wrap',
        }}
      >
        {loading
          ? testcards.map((el, i) => {
              return <DictionaryCardSkelet key={i} />
            })
          : cards.map((el, i) => {
              return <DictionaryCard key={i} title={el.title} id={el.id} />
            })}
      </Box>
    </>
  )
}
