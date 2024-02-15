import React from 'react'
import Text from './Text'
import Progress from './Progress'

const Pagination = ({ timeline, pagesLength, currentPage }) => {
  if (timeline === undefined) return null

  return timeline === 0 ? (
    <Text pagesLength={pagesLength} currentPage={currentPage} />
  ) : (
    <Progress pagesLength={pagesLength} currentPage={currentPage} />
  )
}

export default Pagination
