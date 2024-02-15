import React from 'react'
import { Input } from 'boomform'

const Text = ({ label, classnameprefix, payment, ...props }) => {
  return <Input {...props} type='text' />
}

export default Text
