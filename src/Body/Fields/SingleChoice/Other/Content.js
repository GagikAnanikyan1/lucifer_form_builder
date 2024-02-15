import React from 'react'
import { Input, useField } from 'boomform'

const Content = ({ id, isNumber, placeholder, value = 'Other' }) => {
  const field = useField([id])

  return field?.value === value ? (
    <Input
      type={isNumber ? 'number' : 'text'}
      id={`other.${id}`}
      autoFocus={true}
      placeholder={placeholder}
      className='boomForm-other__item'
    />
  ) : (
    <span
      dangerouslySetInnerHTML={{
        __html: placeholder
      }}
    ></span>
  )
}

export default Content
