import React, { Fragment } from 'react'
import { Custom, Input } from 'boomform'
import ReCAPTCHA from 'react-google-recaptcha'

const Captcha = ({ siteKey }) => {
  const onChange = (handleChange, value) => {
    handleChange({
      id: 'captcha',
      e: null,
      value,
      field: {
        id: 'captcha',
        initial: null,
        validation: { required: { msg: 'Captcha Is Required' } }
      }
    })
  }

  const onBlur = (handleBlur, value) => {
    handleBlur({
      id: 'captcha',
      e: null,
      value: value,
      field: { id: 'captcha', initial: null }
    })
  }

  return (
    <>
      <Custom
        id='captcha'
        validation={{ required: { msg: 'Captcha Is Required' } }}
      >
        {({ handleChange, handleBlur, value }) => {
          return (
            <div id='field-captcha' className='boomForm-field__content'>
              <ReCAPTCHA
                sitekey={siteKey}
                onChange={(newValue) => onChange(handleChange, newValue)}
                onBlur={() => onBlur(handleBlur, value)}
              />
            </div>
          )
        }}
      </Custom>
      <div style={{ height: 0, overflow: 'hidden' }}>
        <Input
          id='captcha'
          validation={{
            HTMLValidate: true,
            required: { msg: 'Captcha Is Required' }
          }}
        />
      </div>
    </>
  )
}

export default Captcha
