import React, { Fragment } from 'react'
import { Input } from 'boomform'
import DropDown from './DropDown/DropDown'

const Phone = ({
  label,
  classnameprefix,
  id,
  defaultCountryCode,
  payment,
  ...props
}) => {
  let _defaultCountryCode = 'AF'
  if (defaultCountryCode) _defaultCountryCode = defaultCountryCode
  return (
    <>
      <DropDown id={id} defaultCountryCode={_defaultCountryCode} />
      <Input id={`${id}.phone`} type='phone' {...props} />
    </>
  )
}

export default Phone
