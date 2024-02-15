import React, { Fragment, useState } from 'react'
import classNames from 'classnames/bind'
import { Input } from 'boomform'

const Password = ({ label, classnameprefix, payment, ...props }) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <>
      <Input {...props} type={showPassword ? 'text' : 'password'} />
      <span
        onClick={() => setShowPassword((value) => !value)}
        className={classNames('password-icon', { active: showPassword })}
      ></span>
    </>
  )
}

export default Password
