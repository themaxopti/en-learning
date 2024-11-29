import React from 'react'
import Alert from '@mui/material/Alert'
import { useSelector } from 'react-redux'
import { alertErrorSelector } from '../../state/selectors'
import { Snackbar } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setAlertError } from '../../state/errors.reducer'

interface Props {
  // title: string
  open: boolean
  autoHideDuration: number
}

export const ErrorAlert: React.FC<Props> = ({
  // title,
  autoHideDuration,
  open,
}) => {
  const errorTitle = useSelector(alertErrorSelector)
  const dispatch = useDispatch()

  return (
    <>
      <Snackbar open={open} autoHideDuration={autoHideDuration} message={errorTitle} onClose={() => dispatch(setAlertError(''))} />
    </>
  )
}
