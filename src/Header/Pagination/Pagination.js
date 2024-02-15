import React, { Fragment } from 'react'
import Timeline from './Timeline/Timeline'
import PerPageHeader from './PerPageHeader'
import { getShowableData } from '../../Helpers/pagination'

const Pagination = ({ isPagination, pagination, currentPage, logicIds }) => {
  if (!isPagination) return null
  const { timeline, pages, mode } = pagination

  //Need to have separated prop for timeline
  // This needs for BoomForm Platform app

  if (mode === 'section') return null
  const { showableCurrentPage, pagesLength } = getShowableData({
    currentPage,
    logicIds,
    pagination
  })

  return (
    <>
      <Timeline
        timeline={timeline}
        pagesLength={pagesLength}
        currentPage={showableCurrentPage}
      />
      <PerPageHeader page={pages[currentPage]} />
    </>
  )
}

export default Pagination
