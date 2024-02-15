import React, { Fragment } from 'react'
import Pagination from './Pagination/Pagination'

const Header = ({
  name,
  description,
  isPagination,
  pagination,
  currentPage,
  logicIds
}) => {
  return (
    <>
      <div className='boomForm__header'>
        <h2 className='boomForm__name'>{name}</h2>
        <h4 className='boomForm__description'>{description}</h4>
      </div>
      <Pagination
        isPagination={isPagination}
        pagination={pagination}
        currentPage={currentPage}
        logicIds={logicIds}
      />
    </>
  )
}

export default Header
