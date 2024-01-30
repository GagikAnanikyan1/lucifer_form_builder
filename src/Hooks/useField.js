import { useEffect, useRef, useState } from 'react'
import Emitter from './../Events'
import {
  getFieldValue,
  setNestedValue,
  getUseFieldInitial
} from './../Helpers/global'

const useField = (ids) => {
  const [data, setData] = useState({
    id: null,
    value: null,
    touched: null,
    ids,
    neededValues: {},
    prevState: {},
    newErrors: {},
    newValues: {},
    newTouched: {}
  })

  const current_event = useRef(null)

  const handleDataSet = (payload) => {
    const { state, errors, values, touched, id } = payload
 
    let neededValues = {}

    for (let i = 0; i < ids.length; i++)
      neededValues = setNestedValue(
        ids[i],
        getFieldValue(values, ids[i]),
        neededValues
      )

    const structuredData = {
      id,
      value: getFieldValue(values, id),
      touched: touched[id],
      ids,
      neededValues,
      prevState: state,
      newErrors: errors,
      newValues: values,
      newTouched: touched
    }

    setData(structuredData)
  }

  useEffect(() => {
    setData(getUseFieldInitial(ids))

    current_event.current = Emitter.addFieldListener(ids, (payload) => {
      setTimeout(() => handleDataSet(payload))
    })

    return () => {
      if (current_event.current)
        Emitter.removeFieldListener(current_event.current)
    }
  }, [JSON.stringify(ids),JSON.stringify(data.id)])
  return data
}

export default useField
