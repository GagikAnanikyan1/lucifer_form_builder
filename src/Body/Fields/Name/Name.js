import React, { Fragment } from 'react'
import { Input } from 'boomform'
import {
  getPlaceholder,
  getInitial,
  getValidation
} from './../../../Helpers/global'
import { getNameFields } from './../../../Helpers/name'

const Name = ({
  id,
  label,
  middleName,
  classnameprefix,
  placeholders,
  initials,
  validations,
  payment,
  ...props
}) => {
  const fields = getNameFields(middleName)

  return (
    <>
      {fields.map((item) => (
        <span className={`name__${item}`} key={`${id}.${item}`}>
          <Input
            {...props}
            key={`${id}.${item}`}
            id={`${id}.${item}`}
            type='text'
            placeholder={getPlaceholder(placeholders, item)}
            initial={getInitial(initials, item)}
            validation={getValidation(validations, item)}
          />
        </span>
      ))}
    </>
  )
}

export default Name
