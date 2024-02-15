import React from 'react'

const Star = ({ color, zoom, click, value, index, ...props }) => {
  return (
    <svg
      {...props}
      className='boomForm-svg boomForm-svg-star'
      onClick={click}
      width={zoom}
      height={zoom}
      fill={value > index ? color : 'none'}
      stroke={color}
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M8.09568 7.47893L10 1.61803L11.9043 7.47893C12.0248 7.84975 12.3704 8.10081 12.7603 8.10081H18.9228L13.9372 11.723C13.6218 11.9522 13.4898 12.3585 13.6103 12.7293L15.5146 18.5902L10.529 14.9679C10.2136 14.7388 9.78643 14.7388 9.47099 14.9679L4.48542 18.5902L6.38974 12.7293C6.51023 12.3585 6.37823 11.9522 6.06279 11.723L1.07722 8.10081H7.23973C7.62963 8.10081 7.97519 7.84975 8.09568 7.47893Z' />
    </svg>
  )
}

export default Star
