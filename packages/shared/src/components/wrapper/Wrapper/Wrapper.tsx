import React from 'react'
import { Grid, Box, useTheme } from '@mui/material'
import { Navbar } from '../Navbar/Navbar'
import s from './Wrapper.module.scss'
import { Header } from '../Header/Header'
import { useSelector } from 'react-redux'
import { navbarWidthSelectort } from '../../../state/reducers/componentsProperties/selectors'
import { alertErrorSelector } from '../../../modules/errorModule/index'
import Alert from '@mui/material/Alert'
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar'

interface Props {
  children: any
  fullHeight?: boolean
}

export const Wrapper: React.FC<Props> = ({ children, fullHeight = false }) => {
  const alertError = useSelector(alertErrorSelector)
  const navbarWidth = useSelector(navbarWidthSelectort)
  const { breakpoints } = useTheme()

  return (
    <>
      {alertError && (
        <Snackbar
          open={alertError ? true : false}
          autoHideDuration={5000}
          // onClose={handleClose}
          message="This Snackbar will be dismissed in 5 seconds."
        />
      )}
      {/* {alertError && <Alert severity="warning">{alertError}</Alert>} */}
      <Box className={s.wrapper}>
        <Box
          sx={{
            maxWidth: `calc(${navbarWidth} + 20px)`,
            width: '100%',
            height: '100vh',
            [breakpoints.down(1200)]: {
              width: '0%',
            },
            [breakpoints.up(1200)]: {
              width: `calc(100% - ${navbarWidth} - 20px)`,
            },
          }}
        >
          <Navbar />
        </Box>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ width: '100%', height: '60px' }}>
            <Header />
          </Box>
          <Box
            sx={{
              boxSizing: 'border-box',
              width: '100%',
              height: fullHeight ? 'calc(100% - 60px)' : 'auto',
              // height:'100%',
              [breakpoints.down(1200)]: {
                paddingBottom: '65px',
                padding: '10px 10px 65px 10px',
              },
              [breakpoints.up(1200)]: {
                padding: '20px 30px 0px 30px',
              },
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </>
  )
}
