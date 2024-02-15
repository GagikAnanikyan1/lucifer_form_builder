export const getPrintableFields = (fields, logic = {}, page = {}) => {
  const { fields: hiddenFields = [] } = logic
  const { fields: pagination = [] } = page
  if (fields) {
    const printableFields = fields.flatMap(({ id }) =>
      !hiddenFields.includes(id) ? id : []
    )
    return [printableFields, pagination].reduce((a, c) => {
      if (!c.length) return a
      return a.filter((i) => c.includes(i))
    })
  } else return []
}

export const getRendableData = (
  fields,
  hiddenFieldIds = {},
  pagination = {},
  currentPage
) => {
  const rendableData = []
  if (pagination && pagination.pages && pagination.pages.length !== 0) {
    if (pagination.mode === 'section') {
      pagination.pages.forEach((page, index) => {
        if (hiddenFieldIds.pages.includes(index)) return
        rendableData.push(getPrintableFields(fields, hiddenFieldIds, page))
      })
      return rendableData
    } else {
      rendableData.push(
        getPrintableFields(
          fields,
          hiddenFieldIds,
          pagination.pages[currentPage]
        )
      )
      return rendableData
    }
  } else {
    rendableData.push(getPrintableFields(fields, hiddenFieldIds, []))
  }
  return rendableData
}

export const getPlaceholder = (placehodler, id) =>
  placehodler !== undefined && placehodler[id] ? placehodler[id] : ''

export const getInitial = (initials, id) =>
  initials !== undefined && initials[id] !== null ? initials[id] : undefined

export const getValidation = (validation, id) =>
  validation !== undefined && validation[id] ? validation[id] : undefined

export const getNestedValue = (values, index) => {
  return index
    .toString()
    .split('.')
    .reduce((acc, index) => {
      return acc[index] || {}
    }, values)
}

export const timeConversion = (s) => {
  const ampm = s.slice(-2)
  const hours = Number(s.slice(0, 2))
  let time = s.slice(0, -2)
  if (ampm === 'AM') {
    if (hours === 12) {
      return time.replace(s.slice(0, 2), '00')
    }
    return time
  } else if (ampm === 'PM') {
    if (hours !== 12) {
      return time.replace(s.slice(0, 2), String(hours + 12))
    }
    return time
  }
  return false
}

export const stripHtml = (label) => {
  let tmp = document.createElement('DIV')
  tmp.innerHTML = label
  return tmp.textContent || tmp.innerText || ''
}

export const iphoneCheck = () => {
  if (typeof window === `undefined` || typeof navigator === `undefined`)
    return false

  return /iPhone/i.test(
    navigator.userAgent ||
      navigator.vendor ||
      (window.opera && opera.toString() === `[object Opera]`)
  )
}
