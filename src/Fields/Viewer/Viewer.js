import React, { useContext } from 'react'
import context from './../../Store/Context'

const Custom = ({ id, initial, children, ...props }) => {
  const { state, actions } = useContext(context)
  const { handleChange, handleBlur, handleClick, declareField } = actions
  const { values, errors, fields, touched } = state

  return children({
    handleChange,
    handleBlur,
    handleClick,
    values,
    errors,
    fields,
    touched
  })
}

export default Custom
