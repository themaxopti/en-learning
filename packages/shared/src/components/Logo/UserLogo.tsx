import React, { useState } from 'react'
import { Box } from '@mui/material'
import {
  ProfileMenu,
  //@ts-ignore
} from '../../../../../services/main/src/modules/authModule/components/ProfileMenu'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

interface Props {}

export const UserLogo: React.FC<Props> = ({}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          display: 'flex',
          background: 'red',
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        {/* <div style={{ position: 'absolute',top:'30px' }}>123</div> */}
        {/* <FadeMenu open={open} /> */}
      </Box>
      <ProfileMenu
        anchorEl={anchorEl}
        handleClick={handleClick}
        handleClose={handleClose}
        open={open}
      />
    </>
  )
}
