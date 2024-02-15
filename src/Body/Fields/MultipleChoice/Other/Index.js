import React from 'react'
import { Checkbox } from 'boomform'
import classNames from 'classnames'
import Content from './Content'
import Quantity from './../../Quantity/Quantity'

const Other = ({ id, options, option, quantity, classnameprefix }) => {
  const { key, value, placeholder, isNumber, checked } = option

  const handleOnChange = (e) => {
    const { handleChange, state, value, field } = e

    const { values } = state
    let isAnyChecked = false
    if (field.id === `${id}.other` && value) isAnyChecked = true
    else if (values[id])
      options.map((option) => {
        if (values[id][option.key] && option.key !== 'other')
          isAnyChecked = true
      })

    if (!value && !isAnyChecked)
      setTimeout(() => handleChange({ id: `${id}.error`, value: '' }))
  }

  return (
    <label
      className={classNames('boomForm-multipleChoice__item', {
        [`${classnameprefix}-multipleChoice__item`]: classnameprefix
      })}
      key={`${id}.${key}`}
    >
      <Checkbox
        id={`${id}.${key}`}
        value={value || 'other'}
        initial={checked}
        onChange={handleOnChange}
      />
      <Content
        id={id}
        index={key}
        placeholder={placeholder}
        isNumber={isNumber}
      />
      <Quantity
        {...quantity}
        id={`${id}.${key}`}
        classnameprefix={classnameprefix}
      />
    </label>
  )
}

export default Other
