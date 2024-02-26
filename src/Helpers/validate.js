export const validate = ({ value, validation, type }) => {
  // Sxal Check Chisht Cheka Petq
  if (!validation) return false

  //Petqa Sirun Grvi
  if (type === 'checkbox' && value === false) {
    if (validation['required']) {
      validation['required'].msg
    }
  }

  if (value === null) value = ''

  for (let item in validation) {
    const { type, msg, value: parameter } = validation[item]
    switch (item) {
      case 'required':
        if (typeof value === 'string' && !value.trim()) return msg
        else if (!value) return msg
        break

      case 'max':
        switch (type) {
          case 'length':
            if (
              value !== null &&
              value !== undefined &&
              value !== '' &&
              value.length > parameter
            )
              return msg
            break
          case 'word':
            if (
              value !== null &&
              value !== undefined &&
              value !== '' &&
              value.trim().split(' ').length > parameter
            )
              return msg
            break
          case 'number':
            if (
              parseInt(value) > parseInt(parameter) ||
              (isNaN(parseInt(value)) &&
                value !== null &&
                value !== undefined &&
                value !== '')
            )
              return msg
            break
        }
        break

      case 'min':
        switch (type) {
          case 'length':
            if (
              value !== null &&
              value !== undefined &&
              value !== '' &&
              value.length < parameter
            )
              return msg
            break
          case 'word':
            if (
              value !== null &&
              value !== undefined &&
              value !== '' &&
              value.trim().split(' ').length < parameter
            )
              return msg
            break
          case 'number':
            if (
              parseInt(value) < parseInt(parameter) ||
              (isNaN(parseInt(value)) &&
                value !== null &&
                value !== undefined &&
                value !== '')
            )
              return msg
            break
        }
        break

      case 'email':
        if (
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
            value
          ) &&
          value
        )
          return msg
        break

      case 'phone':
        if (!/^[0-9- ^*()+]{6,}$/i.test(value) && value) return msg
        break

      case 'url':
        if (
          !/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.([a-zA-Z]{2,5}[\.]{0,1}(.*))$/i.test(
            value
          ) &&
          value
        )
          return msg
        break

      case 'regEx':
        const regex = validation['regEx']

        if (regex) {
          console.log(regex)
          const errorItem = regex.find(
            (item) => !new RegExp(item.value).test(value)
          )
          console.log('errorItem', errorItem)
          return errorItem && errorItem.msg
        }
        break

      case 'custom':
        return validation[item](value)
    }
  }
}

export const handleValidateSelect = ({ value, validation }) => {
  if (!validation) return false
  for (let item in validation) {
    const { msg } = validation[item]
    if (item === 'required' && value && value.key === 'placeholder') return msg
  }
}
export const handleValidateRadio = ({ value, validation }) => {
  if (!validation) return false
  for (let item in validation) {
    const { msg } = validation[item]
    if (item === 'required' && !value) return msg
  }
}
