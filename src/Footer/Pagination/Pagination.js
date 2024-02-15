import React, { Fragment } from 'react'
import Counter from './Counter'
import Buttons from './Buttons/Buttons'
import Numbers from './Buttons/Numbers'
import { getShowableData } from '../../Helpers/pagination'

const Pagination = ({
  formRef,
  global,
  button,
  fields,
  pagination,
  currentPage,
  setCurrentPage,
  payment,
  logic,
  logicIds
}) => {
  const { pageCounter, buttons, pages } = pagination
  const { type } = buttons
  const { showableCurrentPage, pagesLength } = getShowableData({
    currentPage,
    logicIds,
    pagination
  })
  return (
    <>
      {pageCounter && (
        <Counter currentPage={showableCurrentPage} pagesLangth={pagesLength} />
      )}
      {type === 0 ? (
        <Buttons
          formRef={formRef}
          global={global}
          button={button}
          fields={fields}
          pagination={pagination}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          payment={payment}
          logic={logic}
          logicIds={logicIds}
        />
      ) : (
        <Numbers
          formRef={formRef}
          global={global}
          button={button}
          fields={fields}
          pagination={pagination}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          payment={payment}
          logic={logic}
          logicIds={logicIds}
        />
      )}
    </>
  )
}

export default Pagination
