import React from 'react'
import Alert from '@mui/material/Alert'

interface Props {
  title: string
}

export const ErrorAlert: React.FC<Props> = ({ title }) => {
  return (
    <>
      <Alert severity="warning">{title}</Alert>
    </>
  )
}
