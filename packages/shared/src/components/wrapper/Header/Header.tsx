import React, { useRef, useState, useEffect } from 'react'
import { Box, useTheme, Button } from '@mui/material'
import s from './Header.module.scss'
import { useSelector } from 'react-redux'
import { navbarWidthSelectort } from '../../../state/reducers/componentsProperties/selectors'
import logo from '../img/Logo (2).svg'
import { UserLogo } from '../../Logo/UserLogo'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useRefs } from '../Wrapper/WrapperContainer'

// import {} from 'react'

export const Header = React.memo(() => {
  const navbarWidth = useSelector(navbarWidthSelectort)
  const { breakpoints } = useTheme()
  const navigate = useNavigate()

  const { headerRef } = useRefs()

  const [isOverlapping, setIsOverlapping] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    console.log('lap')
  }, [isOverlapping])

  return (
    <>
      <Box
        ref={headerRef}
        className={s.header}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'fixed',
          right: '0',
          [breakpoints.down(1200)]: {
            width: '100%',
            padding: '0px 10px 0px 10px',
          },
          [breakpoints.up(1200)]: {
            padding: '0px 30px 0px 30px',
            width: `calc(100% - ${navbarWidth} - 21px)`,
          },
          height: '60px',
          background: 'white',
        }}
      >
        <Box>
          <Box
            sx={{
              [breakpoints.up(1200)]: {
                display: 'none',
              },
            }}
            onClick={() => navigate('/')}
          >
            <img src={logo} alt="" />
          </Box>
          <Box
            sx={{
              [breakpoints.down(1200)]: {
                display: 'none',
              },
            }}
          >
            {' '}
            <h3>Dictionary</h3>
          </Box>
        </Box>
        <UserLogo />
      </Box>
    </>
  )
})
