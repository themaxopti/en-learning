import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import s from '../../styles/AuthComponents.module.scss'
import { FormikErrors, FormikTouched } from 'formik'

interface Props {
  email: string
  password: string
  repeatPassword: string
  userName: string
  handleChange: any
  onSubmit: any
  formik: any
  serverError: string | null
  type: 'login' | 'register'
  errors: FormikErrors<{
    email: string
    password: string
    repeatPassword: string
    userName: string
  }>
  touched: FormikTouched<{
    email: string
    password: string
    repeatPassword: string
    userName: string
  }>
}

export const AuthForm: React.FC<Props> = ({
  handleChange,
  password,
  email,
  onSubmit,
  formik,
  serverError,
  type,
  repeatPassword,
  userName,
  errors,
  touched,
}) => {
  return (
    <>
      <form onSubmit={e => onSubmit(e)} className={s['form']}>
        <span>
          <strong>{type}</strong>
        </span>
        <Box className={s['form__inputs']}>
          {type === 'register' && (
            <Box className={s['form__inputs__input']}>
              <TextField
                value={userName}
                name="userName"
                label="username"
                variant="standard"
                onChange={handleChange}
              />
              {errors.userName && touched.userName && (
                <span className={s.error}>{errors.userName}</span>
              )}
            </Box>
          )}

          <Box className={s['form__inputs__input']}>
            <TextField
              value={email}
              name="email"
              label="email"
              variant="standard"
              onChange={handleChange}
            />
            {errors.email && touched.email && (
              <span className={s.error}>{errors.email}</span>
            )}
          </Box>
          <Box className={s['form__inputs__input']}>
            <TextField
              name="password"
              value={password}
              label="password"
              variant="standard"
              onChange={handleChange}
            />
            {errors.password && touched.password && (
              <span className={s.error}>{errors.password}</span>
            )}
          </Box>
          {type === 'register' && (
            <Box className={s['form__inputs__input']}>
              <TextField
                value={repeatPassword}
                name="repeatPassword"
                label="repeat password"
                variant="standard"
                onChange={handleChange}
              />
              {errors.repeatPassword && (
                <span className={s.error}>{errors.repeatPassword}</span>
              )}
            </Box>
          )}
        </Box>
        <Button type="submit" sx={{ marginTop: '10px' }} variant="contained">
          {type}
        </Button>
        {serverError && <span className={s.error}>{serverError}</span>}
      </form>
    </>
  )
}
