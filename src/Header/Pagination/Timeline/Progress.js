import React from 'react'
import classNames from 'classnames'

const Progress = ({ pagesLength, currentPage }) => {
  return (
    <div className='boomForm-paginationProgressBar'>
      {Array.from(Array(pagesLength).keys()).map((item, index) => {
        return (
          <div
            key={item}
            className={classNames('boomForm-paginationProgressBar-item', {
              'boomForm-paginationProgressBar-item--active':
                index <= currentPage - 1
            })}
          ></div>
        )
      })}
    </div>
  )
}

export default Progress
