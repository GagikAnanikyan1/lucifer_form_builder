import React from 'react'
import Store from './Store'

import Context from './Store/Context'
import Input from './Fields/Input/Input'
import Textarea from './Fields/Textarea/Textarea'
import File from './Fields/File/File'
import Checkbox from './Fields/Checkbox/Checkbox'
import Select from './Fields/Select/Select'
import Radio from './Fields/Radio/Radio'
import Custom from './Fields/Custom/Custom'
import useField from './Hooks/useField'
import Error from './Additional/Error/Error'

const BoomForm = ({ children, ...props }) => {
  return <Store {...props}>{children}</Store>
}

export {
  Context,
  BoomForm,
  Input,
  Textarea,
  File,
  Checkbox,
  Select,
  Radio,
  Custom,
  Error,
  useField
}
