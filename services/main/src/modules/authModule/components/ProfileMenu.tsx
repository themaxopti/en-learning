import React from 'react'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import { Button, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authApi } from '../api/auth-api'
import { LOGOUT_ACITON } from '../state/auth.reducer'

interface Props {
  anchorEl: null | HTMLElement
  handleClick: any
  handleClose: any
  open: boolean
}

export const ProfileMenu: React.FC<Props> = ({
  anchorEl,
  handleClick,
  handleClose,
  open,
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { breakpoints } = useTheme()

  function loginButtonHandler() {
    handleClose()
    navigate('/login')
  }

  async function logOut() {
    dispatch({ type: LOGOUT_ACITON })
    navigate('/login')
    handleClose()
  }

  return (
    <>
      <Menu
        sx={{
          position: 'absolute',
          [breakpoints.down(1200)]: {
            transform: 'translateX(10px)',
          },
          [breakpoints.up(1200)]: {
            transform: 'translateX(-10px)',
          },
        }}
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              position: 'absolute',
              top: 0,
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        // transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        // anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem onClick={loginButtonHandler}>Log in</MenuItem>
        <MenuItem onClick={handleClose}>Register</MenuItem>
        <Divider />
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem> */}
        {/* <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem> */}
        <MenuItem onClick={logOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}

export function FadeMenu({ open }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  // const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div style={{ position: 'absolute' }}>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        // TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
      <div>123</div>
    </div>
  )
}
