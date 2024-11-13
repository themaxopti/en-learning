import { Box, Skeleton } from '@mui/material'
import React from 'react'
import { AddWordForm } from '../../components/Form/AddWordForm'
import { WrapperContainer } from '@packages/shared/src/components/wrapper/Wrapper/WrapperContainer'
import s from '../../styles/DictionaryPage.module.scss'
import { Dictionary } from '../../components/Dictionary/Dictionary'
import { useDictionaryPage } from '../../hooks/useDictionaryPage'

interface Props {}

export const DictionaryPage: React.FC<Props> = ({}) => {
  const { isDictionaryExist, isWordsLoading, newWordsAmount, newWordsPending } =
    useDictionaryPage()

  if (!isDictionaryExist && !isWordsLoading) {
    return (
      <WrapperContainer fullHeight>
        <h2>This dictionary does not exist</h2>
      </WrapperContainer>
    )
  }

  return (
    <>
      <WrapperContainer fullHeight>
        <Box className={s.dictionary}>
          <Box className={s.dictionary__form}>
            {isWordsLoading ? (
              <Skeleton variant="text" width={210} height={30} />
            ) : (
              <Box sx={{ maxWidth: '200px', width: '100%' }}>
                <h2>Dictionary title</h2>
              </Box>
            )}
            <AddWordForm />
          </Box>
          <Dictionary
            newWordsAmount={newWordsAmount}
            newWordsPending={newWordsPending}
            isWordsLoading={isWordsLoading}
          />
          dasdas
        </Box>
      </WrapperContainer>
    </>
  )
}
