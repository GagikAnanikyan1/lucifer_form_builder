import React, { useContext, Fragment } from 'react'
import context from './../../Store/Context'

const Error = ({ id }) => {
  const { state } = useContext(context)
  const { errors, touched } = state

  if (id === undefined) throw 'Id parameter is required for Error Component'

  const isError = errors[id]
  const isTouched = touched[id]

  if (isError && isTouched) return <>{isError}</>

  return null
}

export default Error
