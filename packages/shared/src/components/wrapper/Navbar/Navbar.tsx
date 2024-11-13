import React, { useState, useEffect } from 'react'
import { Grid, Box } from '@mui/material'
import s from './Navbar.module.scss'
import { Item } from './Item'
import logo from '../img/Logo (2).svg'
import line from '../img/Vector 1.svg'
import { Logo } from '../../Logo/Logo'
import arrow from '../img/arrow.png'
import book from '../img/open-book.png'
import classNames from 'classnames'
import { Img } from '../../Img/Img'
import { useSelector } from 'react-redux'
import { navbarWidthSelectort } from '../../../state/reducers/componentsProperties/selectors'
import { setNavbarWidth } from '../../../state/reducers/componentsProperties/componentsProperties.reducer'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate, useRoutes } from 'react-router-dom'

export interface NavbarItem {
  title: string
  path: string
}

export const Navbar = () => {
  const [active, setActive] = useState(0)
  const [items] = useState<NavbarItem[]>([
    {
      title: 'Dictionaries',
      path: '/',
    },
    {
      title: 'Quizzes',
      path:'/quizzes'
    },
  ])
  const [close, setClose] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const navbarWidth = useSelector(navbarWidthSelectort)

  const navbarClasses = classNames({
    [s.navbar]: true,
    [s['navbar--close']]: close,
  })

  useEffect(() => {
    if (close) {
      dispatch(setNavbarWidth('50px'))
    } else {
      dispatch(setNavbarWidth('200px'))
    }
  }, [close])

  return (
    <>
      <Box className={navbarClasses}>
        <Box
          className={s.navbar__logos}
          style={{ height: '50px', display: 'flex' }}
          onClick={() => navigate('/')}
        >
          <img className={s.logo} src={logo} alt="" />
          <img
            style={{ margin: 'auto' }}
            className={s['logo-line']}
            src={line}
            alt=""
          />
        </Box>
        <Box flexDirection={'column'} className={s.navbar__items}>
          {items.map((el, i) => {
            return (
              <Item
                setActive={setActive}
                key={i}
                title={el.title}
                path={el.path}
                active={location.pathname === el.path }
                i={i}
                photo={book}
              />
            )
          })}
        </Box>
        <Box className={s.navbar__menu}>
          <Box>
            <Item
              path={''}
              setActive={() => {
                setClose(!close)
              }}
              title={'Close'}
              active={false}
              i={2000}
              photo={arrow}
            />
          </Box>
        </Box>
      </Box>
    </>
  )
}
