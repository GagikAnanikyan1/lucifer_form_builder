import React, { useEffect, useContext, useRef } from 'react'
import context from './../../Store/Context'
import { getFieldValue } from '../../Helpers/global'
import { useNativeValidationMessage } from '../../Hooks/useNativeValidationMessage'

const Radio = ({
  id,
  initial,
  value: radioValue,
  validation = {},
  ...props
}) => {
  const { state, actions } = useContext(context)
  const { handleValidationChange, handleValidationBlur } =
    useNativeValidationMessage()
  const ref = useRef()
  const { handleChange, handleBlur, declareField } = actions
  const { values, errors, fields } = state

  useEffect(() => {
    declareField({
      id,
      initial: initial === true ? radioValue : null,
      field: { type: 'radio', validation, value: radioValue, ...props }
    })
  }, [id, initial])

  useEffect(() => {
    if (HTMLValidate === true) {
      if (ref.current && errors[id] !== undefined)
        ref.current.setCustomValidity(errors[id])
      else if (ref.current) ref.current.setCustomValidity('')
    }
  }, [ref.current, errors, fields])

  const value = getFieldValue(values, id)
  const { HTMLValidate } = validation

  const onChange = (e) => {
    if (HTMLValidate === true)
      handleValidationChange({ e, possibleError: errors[id] })

    handleChange({
      id,
      value: e.target.value,
      event:{...e},
      ref,
    })
  }

  const onBlur = (e) => {
    if (HTMLValidate === true)
      handleValidationBlur({ e, possibleError: errors[id] })

    handleBlur({ id })
  }

  if (value === undefined) return null

  return (
    <input
      {...props}
      ref={ref}
      type='radio'
      name={id}
      value={radioValue}
      checked={value === radioValue}
      onChange={onChange}
      onBlur={onBlur}
    />
  )
}

export default Radio
