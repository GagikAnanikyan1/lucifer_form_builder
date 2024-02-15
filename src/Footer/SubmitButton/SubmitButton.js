import React, { useContext, useState, useEffect } from 'react'
import { Context } from 'boomform'
import Print from './../../Print/Print'
import { getTotalPrice, formatPrice } from './../../Helpers/payment'
import { formValueCheker } from '../../Helpers/logic'

const SubmitButton = ({
  global,
  button,
  fields,
  hide,
  formRef,
  payment,
  logic,
  logicIds,
  pagination,
  setCurrentPage
}) => {
  const { state, actions } = useContext(Context)
  const { values } = state
  const { text, prefix, suffix } = button || { text: 'Submit' }
  const { name, description, isPrint, onSubmit, onSubmitFailed } = global
  const { fee, total, setTotal } = payment

  const formatedTotal = formatPrice({ payment, price: total })

  useEffect(() => {
    setTotal && setTotal(getTotalPrice({ values, fields, fee, logic }))
  }, [state, total])

  if (hide) return null

  const handleClick = (e) => {
    e.preventDefault()
    if (formRef.current.checkValidity()) {
      const reddirectPage = formValueCheker({ fields, logicIds, pagination })
      if (reddirectPage) {
        setCurrentPage(+reddirectPage)
        setTimeout(() => {
          formRef.current.reportValidity()
        }, 30)
        return
      }
      if (onSubmit) onSubmit({ state, actions })
      else console.log({ state, actions })
    } else {
      formRef.current.reportValidity()
      if (onSubmitFailed)
        onSubmitFailed(state, formRef.current.querySelectorAll(':invalid'))
    }
  }

  return (
    <div className={'boomForm-button__content'}>
      {suffix}
      <button onClick={handleClick}>
        <span>
          {text}
          {formatedTotal}
        </span>
      </button>
      {prefix}
      {isPrint && (
        <Print fields={fields} name={name} description={description} />
      )}
    </div>
  )
}

export default SubmitButton
