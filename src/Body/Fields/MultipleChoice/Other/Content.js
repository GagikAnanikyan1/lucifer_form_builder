import React from 'react'
import { Input, useField } from 'boomform'

const Content = ({ id, index, placeholder, isNumber }) => {
  const field = useField([`${id}.${index}`])
  const handleOnChange = (e) => {
    const { handleChange, value } = e

    setTimeout(() =>
      handleChange({
        id: `${id}.error`,
        value: value
      })
    )
  }

  if (field?.value)
    return (
      <Input
        type={isNumber ? 'number' : 'text'}
        id={`other.${id}`}
        autoFocus={true}
        placeholder={placeholder}
        className='boomForm-other__item'
        onChange={handleOnChange}
      />
    )
  else
    return (
      <span
        dangerouslySetInnerHTML={{
          __html: placeholder
        }}
      ></span>
    )
}

export default Content
