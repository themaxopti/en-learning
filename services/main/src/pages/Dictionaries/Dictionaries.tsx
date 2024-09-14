import { Wrapper } from '@packages/shared/src/components/wrapper/Wrapper/Wrapper'
import React from 'react'
import { DicitionaryListPage } from '../../modules/dictionaryModule/pages/DicitionaryListPage/DicitionaryListPage'
import { WrapperContainer } from '@packages/shared/src/components/wrapper/Wrapper/WrapperContainer'

export const Dictionaries = () => {
    return (
        <WrapperContainer>
            <DicitionaryListPage />
        </WrapperContainer>
    )
}
