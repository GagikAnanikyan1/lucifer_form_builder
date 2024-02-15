import React, { Fragment } from 'react'

import SubmitButton from './SubmitButton/SubmitButton'
import Pagination from './Pagination/Pagination'
import Captcha from './Captcha'

const Footer = ({
  formRef,
  global,
  button,
  fields,
  isPagination,
  pagination,
  currentPage,
  setCurrentPage,
  payment,
  logic,
  logicIds
}) => {
  const { captcha } = global
  const { mode } = pagination

  return !isPagination || mode === 'section' ? (
    <>
      {captcha !== undefined && <Captcha siteKey={captcha} />}
      <SubmitButton
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
    </>
  ) : (
    <Pagination
      global={global}
      button={button}
      fields={fields}
      formRef={formRef}
      pagination={pagination}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      payment={payment}
      logic={logic}
      logicIds={logicIds}
    />
  )
}

export default Footer
