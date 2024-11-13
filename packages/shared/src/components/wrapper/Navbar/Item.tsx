import React from 'react'
import s from './Navbar.module.scss'
import book from '../img/open-book.png'
import { Img } from '../../Img/Img'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'

interface Props {
  title: string
  i: number
  active: boolean
  setActive: React.Dispatch<React.SetStateAction<number>>
  photo: any
  path: string
}

export const Item: React.FC<Props> = ({
  title,
  active,
  i,
  setActive,
  photo,
  path,
}) => {
  const navigate = useNavigate()


  return (
    <>
      <div
        onClick={() => {
          setActive(i)
          navigate(path)
        }}
        className={classNames({
          [s.navbar__item]: true,
          [s['navbar__item--active']]: active,
        })}
      >
        <Img src={photo} w="22px" h="22px" />
        <div className={s['navbar__item-text']}>{title}</div>
      </div>
    </>
  )
}
