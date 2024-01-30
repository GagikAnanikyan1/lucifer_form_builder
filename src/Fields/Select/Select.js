import React, { useEffect, useContext, useState, useRef } from 'react'
import context from './../../Store/Context'
import { getFieldValue } from '../../Helpers/global'
import { useNativeValidationMessage } from '../../Hooks/useNativeValidationMessage'

const Select = ({ id, initial, options, validation = {}, ...props }) => {
  const { state, actions } = useContext(context)
  const { handleValidationChange, handleValidationBlur } =
    useNativeValidationMessage()
  const ref = useRef()
  const [hidePlaceholder, setHidePlaceholder] = useState(false)
  const { handleChange, handleBlur, declareField } = actions
  const { values, errors } = state
  const { HTMLValidate } = validation

  if (!options) throw new Error('select should have a options attribute')

  const getValueByKey = (neededKey) => {
    const [selectedValue] = options.filter((item) => item.key === neededKey)
    return selectedValue || options[0]
  }

  useEffect(() => {
    const actualInitial =
      initial === undefined || initial === ''
        ? options[0]
        : getValueByKey(initial)

    if (initial && initial.key !== 'placeholder' && validation.required)
      setHidePlaceholder(true)

    declareField({
      id,
      initial: actualInitial,
      field: {
        options,
        validation,
        type: 'select',
        ...props
      }
    })
  }, [id, initial])

  useEffect(() => {
    if (HTMLValidate === true) {
      if (ref.current && errors[id] !== undefined)
        ref.current.setCustomValidity(errors[id])
      else if (ref.current) ref.current.setCustomValidity('')
    }
  }, [ref.current, errors])

  const onChange = (e) => {
    if (HTMLValidate === true)
      handleValidationChange({ e, possibleError: errors[id] })

    const [newValue] = options.filter((item) => e.target.value == item.key)

    // Need to add again in reset function
    // if (newValue && newValue.key !== 'placeholder' && validation.required)
    //   setHidePlaceholder(true)

    handleChange({
      id,
      value: newValue,
      event: { ...e },
      ref,
    })
  }

  const onBlur = (e) => {
    if (HTMLValidate === true)
      handleValidationBlur({ e, possibleError: errors[id] })

    handleBlur({ id })
  }

  const value = getFieldValue(values, id)
  if (value === undefined) return null

  let selectedKey = options[0].key
  if (value && value.hasOwnProperty('key')) {
    const { key: actualSelectedKey } = value
    selectedKey = actualSelectedKey
  }

  return (
    <select value={selectedKey} ref={ref} onChange={onChange} onBlur={onBlur}>
      {options.map((option, index) => {
        const { value: optionValue, label, key: optionKey } = option

        if (optionKey === 'placeholder' && hidePlaceholder) return null

        return (
          <option key={index} value={optionKey} name={optionValue}>
            {label || optionValue}
          </option>
        )
      })}
    </select>
  )
}

export default Select
