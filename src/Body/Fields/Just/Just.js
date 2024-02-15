import React from 'react'

const Just = ({ Component }) => {
  if (typeof Component !== 'function') return null
  return <Component />
}

export default Just
