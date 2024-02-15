import React from 'react'

const PerPageHeader = ({ page }) => {
  const { title, description } = page

  return (
    <div className={'perpage-header'}>
      {title && <h3 className={'perpage-title'}>{title}</h3>}
      {description && <h5 className={'perpage-description'}>{description}</h5>}
    </div>
  )
}

export default PerPageHeader
