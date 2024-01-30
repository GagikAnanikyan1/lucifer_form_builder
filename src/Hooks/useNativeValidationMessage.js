import { useState, useCallback } from 'react'

export const useNativeValidationMessage = () => {
  const [activeField, setActiveField] = useState(true)

  const handleBlur = useCallback(
    ({ e, possibleError }) => {
      if (activeField && possibleError !== undefined && possibleError !== '') {
        e.target.reportValidity()
        setActiveField(false)
      } else setActiveField(true)
    },
    [activeField]
  )

  const handleChange = useCallback(
    ({ possibleError }) => {
      if (possibleError !== undefined && possibleError !== '')
        setActiveField(true)
    },
    [activeField]
  )

  return {
    handleValidationChange: handleChange,
    handleValidationBlur: handleBlur
  }
}
