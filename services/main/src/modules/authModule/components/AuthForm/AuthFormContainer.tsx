import { FormikHelpers, useFormik } from 'formik'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AuthForm } from './AuthForm'
import * as Yup from 'yup'
import { authApi } from '../../api/auth-api'
import { AUTH_ACITON, setIsAuth } from '../../state/auth.reducer'
import { setProfile } from '@/modules/userModule'
import { useNavigate } from 'react-router-dom'

interface Props {
  type: 'login' | 'register'
}

interface RegisterValues {
  email: string
  password: string
  repeatPassword: string
  userName: string
}

type LoginValues = Omit<RegisterValues, 'userName' | 'repeatPassword'>

// type HelpersValues = FormikHelpers<{
//   email: string
//   password: string
//   repeatPassword: string
//   userName: string
// }>

const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
})

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(4, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  repeatPassword: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  userName: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
})

export const AuthFormContainer: React.FC<Props> = ({ type }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [serverError, setServerError] = useState(null)

  // useEffect(() => {
  //   dispatch({ type: AUTH_ACITON })
  // }, [])

  function comparePassword(password: string, repeatPassword: string) {
    return password === repeatPassword
  }

  async function loginSubmit(values: LoginValues) {
    const data = await authApi.login({
      email: values.email,
      password: values.password,
    })

    if (data.statusCode === 400) {
      setServerError(data.message)
      return
    }

    dispatch(setProfile(data.data))
    dispatch(setIsAuth(true))

    navigate('/')
    console.log('login')
  }

  function registerSubmit({
    email,
    password,
    repeatPassword,
    userName,
  }: RegisterValues) {
    if (password !== repeatPassword) {
      setServerError('Passwords do not match')
      return
    }

    setServerError(null)
    console.log('register')
  }

  const formik = useFormik({
    initialValues:
      type === 'register'
        ? {
            email: '',
            password: '',
            repeatPassword: '',
            userName: '',
          }
        : {
            email: '',
            password: '',
          },
    onSubmit: type === 'login' ? loginSubmit : registerSubmit,
    validationSchema: type === 'login' ? SigninSchema : SignupSchema,
  })

  const memoHandleChange = useCallback((e: React.ChangeEvent<any>) => {
    formik.handleChange(e)
  }, [])

  const memoOnSubmit = useCallback((e: any) => {
    formik.handleSubmit(e)
  }, [])

  return (
    <>
      <AuthForm
        touched={formik.touched}
        repeatPassword={formik.values.repeatPassword}
        userName={formik.values.userName}
        type={type}
        formik={formik}
        handleChange={memoHandleChange}
        email={formik.values.email}
        password={formik.values.password}
        onSubmit={memoOnSubmit}
        serverError={serverError}
        // @ts-ignore
        errors={formik.errors}
      />
    </>
  )
}
