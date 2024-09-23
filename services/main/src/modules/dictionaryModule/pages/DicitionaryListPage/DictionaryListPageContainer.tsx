import { WrapperContainer } from '@packages/shared/src/components/wrapper/Wrapper/WrapperContainer'
import React from 'react'
import { DicitionaryListPage } from './DicitionaryListPage'
interface Props {}

export const DictionaryListPageContainer: React.FC<Props> = ({}) => {
  return (
    <>
      <WrapperContainer>
        <DicitionaryListPage />
      </WrapperContainer>
    </>
  )
}
