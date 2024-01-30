import React, { useEffect, useContext } from 'react'
import context from './../../Store/Context'
import { getFieldValue } from '../../Helpers/global'

const Custom = ({ id, initial, children, ...props }) => {
  const { state, actions } = useContext(context)
  const { handleChange, handleBlur, handleClick, declareField, getAndChange } =
    actions
  const { values, errors, fields, touched } = state

  useEffect(() => {
    const actualInitial = initial === undefined ? null : initial
    declareField({
      id,
      initial: actualInitial,
      field: { type: 'custom', ...props }
    })
  }, [id, initial])

  const value = getFieldValue(values, id)
  if (value === undefined) return null

  return children({
    id,
    handleChange,
    getAndChange,
    handleBlur,
    handleClick,
    value,
    values,
    errors,
    fields,
    touched
  })
}

export default Custom
