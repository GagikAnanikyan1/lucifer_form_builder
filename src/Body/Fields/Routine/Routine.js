import React from 'react'
import { Custom } from 'boomform'

const Routine = ({ component, ...props }) => {
  return (
    <Custom {...props}>
      {(attrs) => {
        return component({
          props,
          attrs
        })
      }}
    </Custom>
  )
}

export default Routine
