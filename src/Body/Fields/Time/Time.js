import React, { Fragment } from 'react'
import { Input, Select } from 'boomform'
import { getTimeFields } from './../../../Helpers/time'
import { getInitial, getValidation } from './../../../Helpers/global'

const Time = ({
  id,
  initial,
  label,
  format,
  classnamepreFix,
  validations,
  initials,
  placeholders,
  payment,
  ...props
}) => {
  return (
    <>
      {getTimeFields(format, placeholders).map((item) => {
        const { key, placeholder } = item
        return (
          <Fragment key={`${id}.${key}`}>
            {key !== 'format' && (
              <span className={`time__${key}`}>
                <Input
                  {...props}
                  id={`${id}.${key}`}
                  type='text'
                  maxLength='2'
                  placeholder={placeholder}
                  validation={getValidation(validations, key)}
                  initial={getInitial(initials, key)}
                />
              </span>
            )}

            {key === 'hour' && <span>:</span>}

            {key === 'format' && (
              <Select
                {...props}
                id={`${id}.${key}`}
                initial={initials?.format || 1}
                options={[
                  { key: 1, value: 'AM' },
                  { key: 2, value: 'PM' }
                ]}
              />
            )}
          </Fragment>
        )
      })}
    </>
  )
}
export default Time
