import React, { Fragment } from 'react'
import SubmitButton from './../../SubmitButton/SubmitButton'
import Captcha from './../../Captcha'
import { getNextPageIndex, getPrevPageIndex } from '../../../Helpers/pagination'

const Buttons = ({
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
  const { buttons, pages } = pagination
  const { prev = 'Prev', next = 'Next' } = buttons
  const { captcha, onPageChange } = global
  const prevPageIndex = getPrevPageIndex({
    pagination,
    currentPage,
    logicIds
  })
  const nextPageIndex = getNextPageIndex({
    pagination,
    currentPage,
    logicIds
  })

  const handleNext = () => {
    if (formRef.current.checkValidity()) {
      setCurrentPage(+nextPageIndex)
      if (onPageChange) onPageChange()
    } else formRef.current.reportValidity()
  }

  const handlePrev = () => {
    setCurrentPage(+prevPageIndex)
    if (onPageChange) onPageChange()
  }

  return (
    <>
      {captcha !== undefined && currentPage === pages.length - 1 && (
        <Captcha siteKey={captcha} />
      )}
      <div className='boomForm-paginationButtons__content'>
        {prevPageIndex && (
          <button
            type='button'
            className='boomForm-paginationButton boomForm-paginationButton-prev'
            onClick={handlePrev}
          >
            {prev}
          </button>
        )}

        <SubmitButton
          hide={nextPageIndex}
          global={global}
          button={button}
          fields={fields}
          formRef={formRef}
          payment={payment}
          logic={logic}
          logicIds={logicIds}
          pagination={pagination}
          setCurrentPage={setCurrentPage}
        />

        {nextPageIndex && (
          <button
            type='button'
            className='boomForm-paginationButton boomForm-paginationButton-next'
            onClick={() => handleNext()}
          >
            {next}
          </button>
        )}
      </div>
    </>
  )
}

export default Buttons
