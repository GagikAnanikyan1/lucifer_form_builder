import React from 'react'
import { Input, useField } from 'boomform'

const Other = ({ id }) => {
  const field = useField([id])

  return (
    field?.value?.key === 'other' && (
      <Input
        type={field?.value?.isNumber ? 'number' : 'text'}
        id={`other.${id}`}
        autoFocus={true}
        placeholder={field?.value?.value}
        className='boomForm-other__item'
      />
    )
  )
}

export default Other
