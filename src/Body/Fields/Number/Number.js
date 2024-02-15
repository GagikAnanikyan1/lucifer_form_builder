import React from 'react'
import { Input } from 'boomform'

const Number = ({ label, classnameprefix, payment, ...props }) => {
  return <Input {...props} type='number' />
}

export default Number
