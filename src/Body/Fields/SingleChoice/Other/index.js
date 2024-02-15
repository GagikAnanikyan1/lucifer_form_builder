import React from 'react'
import { Radio } from 'boomform'
import classNames from 'classnames'
import Content from './Content'

const Other = ({ id, option, classnameprefix }) => {
  const { key, value, checked, isNumber, placeholder } = option

  return (
    <label
      className={classNames('boomForm-singleChoice__item', {
        [`${classnameprefix}-singleChoice__item`]: classnameprefix
      })}
      key={`${id}.${key}`}
    >
      <Radio id={id} value={value || 'other'} initial={checked} />
      <Content
        id={id}
        value={value}
        isNumber={isNumber}
        placeholder={placeholder}
      />
    </label>
  )
}

export default Other
