import React from 'react'

const Counter = ({ currentPage, pagesLangth }) => (
  <div className='boomForm-paginationCount'>
    {currentPage}/{pagesLangth || 1}
  </div>
)

export default Counter
