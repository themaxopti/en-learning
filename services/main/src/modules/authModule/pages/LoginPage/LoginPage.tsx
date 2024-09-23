import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { WrapperContainer } from '@packages/shared/src/components/wrapper/Wrapper/WrapperContainer'
import s from '../../styles/AuthComponents.module.scss'
import { AuthFormContainer } from '../../components/AuthForm/AuthFormContainer'

interface Props {}

export const LoginPage: React.FC<Props> = ({}) => {

    useEffect(() => {
        // console.log(process.env.SERVER_URL);
    },[])
    
  return (
    <>
      <WrapperContainer>
        <Box className={s['auth-page']}>
          <AuthFormContainer type='login' />
        </Box>
      </WrapperContainer>
    </>
  )
}
