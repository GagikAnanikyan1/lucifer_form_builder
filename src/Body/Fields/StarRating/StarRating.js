import React, { Fragment, useRef } from 'react'
import Star from './Star'
import Circle from './Circle'
import { Custom, Input } from 'boomform'

const StarRating = (props) => {
  const { id,
    count = 5,
    shape,
    color = '#FFAB07',
    zoom = 40,
    validation} = props


const validationField = useRef()
  
  return (
    <Custom id={id} {...props}>
      {({ handleChange, handleBlur, value }) => {
        return (
          <>
          <div
            onBlur={() => {
              if (validation.HTMLValidate === true) {
                const validationInput = validationField.current.firstChild
                validationInput.focus()
                validationInput.blur()
              }
              handleBlur({
                id,
                value,
                e: null,
                field: props
              })
            }}
          >
            {Array.from({ length: count }, (item, index) => {
              return shape === 'circle' ? (
                <Circle
                  key={index}
                  {...props}
                  click={(e) =>
                    handleChange({
                      id,
                      value: index + 1,
                      e,
                      field: { id, type: 'starRating' }
                    })
                  }
                  value={value}
                  index={index}
                  color={color}
                  zoom={zoom}
                />
              ) : (
                <Star
                  key={index}
                  {...props}
                  click={(e) =>
                    handleChange({
                      id,
                      value: index + 1,
                      e,
                      field: { id, type: 'starRating' }
                    })
                  }
                  value={value}
                  index={index}
                  color={color}
                  zoom={zoom}
                />
              )
            })}
          </div>
            {validation.HTMLValidate === true && <div ref={validationField} style={{ overflow: 'hidden', height: "0px" }}>
                <Input maxLength="0" {...props} type='text'/>
              </div>
            }
          </>
        )
      }}
    </Custom>
  )
}

export default StarRating
