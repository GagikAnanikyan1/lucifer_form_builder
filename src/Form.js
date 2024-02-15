import React, { useState, useEffect, useRef } from 'react'
import { useField } from 'boomform'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Body from './Body'
import StateHandler from './StateHandler'

import { getHiddenIds, getUpdatableFields } from './Helpers/logic'
import { getRendableData } from './Helpers/global'

const Form = ({
  global,
  fields,
  button,
  payment,
  pagination,
  logic,
  gridOptions
}) => {
  const {
    name,
    description,
    onStateChange = () => {},
    onFirstRender = () => {},
    onDie = () => {}
  } = global
  const updatableFields = getUpdatableFields({ logic })
  const { initial = 0 } = pagination
  const formRef = useRef(null)
  const [currentPage, setCurrentPage] = useState(initial)
  const isPagination = Object.keys(pagination).length !== 0
  const data = useField(updatableFields)

  const logicIds = getHiddenIds({
    logic,
    values: data?.neededValues ? data?.neededValues : {},
    fields,
    formRef
  })

  const printableFields = getRendableData(
    fields,
    logicIds,
    pagination,
    currentPage
  )

  useEffect(() => {
    setCurrentPage(initial)
  }, [initial])

  useEffect(() => {
    onFirstRender({ setCurrentPage })

    return () => {
      onDie({ setCurrentPage })
    }
  }, [])

  return (
    <form ref={formRef} className='boomForm'>
      <Header
        name={name}
        description={description}
        isPagination={isPagination}
        pagination={pagination}
        currentPage={currentPage}
        logicIds={logicIds}
      />
      <Body
        fields={fields}
        payment={payment}
        printableFields={printableFields}
        gridOptions={gridOptions}
      />
      <Footer
        formRef={formRef}
        global={global}
        button={button}
        fields={fields}
        isPagination={isPagination}
        pagination={pagination}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        payment={payment}
        logic={logic}
        logicIds={logicIds}
      />

      <StateHandler
        onStateChange={onStateChange}
        formRef={formRef}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </form>
  )
}

export default Form
