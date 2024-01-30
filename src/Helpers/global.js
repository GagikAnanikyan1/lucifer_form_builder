export const isObject = (variable) => {
  return (
    typeof variable === 'object' &&
    !Array.isArray(variable) &&
    variable !== null
  )
}

export const setNestedValue = (key, value, values) => {
  const keyPath = key.toString().split('.')
  keyPath.reduce((acc, val, index) => {
    if (keyPath.length - 1 === index) {
      return (acc[val] = value)
    }
    if (!isObject(acc[val]) || acc[val] === null) return (acc[val] = {})
    else return acc[val]
  }, values)
  return values
}

export const getFieldValue = (values, id) => {
  if (!id) throw 'field should have a id attribute'
  if (!id.toString().includes('.')) return values[id]
  let idPath = id.split('.')
  idPath = idPath.filter((path) => path)
  return [values].concat(idPath).reduce((acc, val) => {
    if (!acc) return undefined
    return acc[val]
  })
}

export const checkIdStructure = (id, fields) => {
  for (let i = 0; i < fields.length; i++) {
    const { id: prevId } = fields[i]
    const splitedPrevId = prevId.toString().split('.')
    const splitedId = id.toString().split('.')
    if (splitedId.length > splitedPrevId.length) {
      if (
        JSON.stringify(splitedId.splice(0, splitedPrevId.length)) ==
        JSON.stringify(splitedPrevId)
      )
        throw new Error('Invalid `object` structure')
    } else {
      if (
        JSON.stringify(splitedPrevId.splice(0, splitedId.length)) ==
        JSON.stringify(splitedId)
      )
        throw new Error('Invalid `object` structure')
    }
  }
}

export const deepCopy = (object) => {
  let newObject = object
  if (object && isObject(object)) {
    newObject = {}
    for (var i in object) newObject[i] = deepCopy(object[i])
  }
  return newObject
}

export const changeFieldInitial = ({ id, initial, values }) => {
  if (id.toString().includes('.')) values = setNestedValue(id, initial, values)
  else values[id] = initial
  return values
}

export const getUseFieldInitial = (ids) => {
  const structuredData = {
    id: null,
    value: null,
    touched: null,
    ids,
    neededValues: {},
    prevState: {},
    newErrors: [],
    newTouched: []
  }

  if (window.__current_form_state) {
    const { values, touched, errors } = window.__current_form_state
    let neededValues = {}

    for (let i = 0; i < ids.length; i++)
      neededValues = setNestedValue(
        ids[i],
        getFieldValue(values, ids[i]),
        neededValues
      )

    structuredData.neededValues = neededValues
    structuredData.prevState = window.__current_form_state
    structuredData.newErrors = errors
    structuredData.newTouched = touched
  }

  return structuredData
}

export const replaceIdInObject = (obj, oldId, newId) => {
  let newObj = {}
  Object.keys(obj).forEach((key) => {
    if (key.indexOf(oldId) === 0) newObj[key.replace(oldId, newId)] = obj[key]
    else newObj[key] = obj[key]
  })

  return newObj
}

export const replaceIdInFieldsArray = (arr, oldId, newId) => {
  arr.forEach((value) => {
    if (value.id.indexOf(oldId) === 0) value.id = value.id.replace(oldId, newId)
  })

  return [...arr]
}

export const replaceIdInValues = (values, oldId, newId) => {
  const oldIds = oldId.split('.')
  const newIds = newId.split('.')

  if (oldIds.length !== newIds.length) return values

  Object.keys(values).forEach((key) => {
    if (key === oldIds[0]) {
      let firstNewId = newIds[0]
      let firstOldId = oldIds[0]

      if (firstNewId !== firstOldId) {
        values[firstNewId] = values[firstOldId]
        delete values[firstOldId]
      }

      newIds.shift()
      oldIds.shift()

      if (isObject(values[firstNewId]) && oldIds.length !== 0)
        values[firstNewId] = replaceIdInValues(
          values[firstNewId],
          oldIds.join('.'),
          newIds.join('.')
        )
    }
  })

  return values
}

export const deleteDeepObject = (array, obj) => {
  for (let i = 0; i <= array.length; i++) {
    for (let key in obj) {
      if (obj[array[i]] !== undefined) {
        if (typeof obj[array[i]] === 'object') {
          let newArray = array.slice(i)
          if (i === newArray.length) {
            delete obj[array[i]]
          }
          deleteDeepObject(newArray, obj[array[i]])
        } else {
          delete obj[array[i]]
        }
      }
    }
  }
  return obj
}

export const deleteDeepStringsKey = (value, obj) => {
  for (let key in obj) {
    if (key.includes(value)) {
      delete obj[key]
    }
  }
  return obj
}
