import React from 'react'

const Circle = ({ color, zoom, click, value, index, ...props }) => {
  return (
    <svg
      {...props}
      className='boomForm-svg boomForm-svg-circle'
      onClick={click}
      width={zoom}
      height={zoom}
      fill={value > index ? color : 'none'}
      stroke={color}
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='10' cy='10' r='9.5'></circle>
    </svg>
  )
}

export default Circle
