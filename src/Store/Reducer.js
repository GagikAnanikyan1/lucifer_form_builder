import {
  DECLARE_FIELD,
  EDIT_FIELD,
  RESET_FORM,
  SET_TOUCHED,
  DECLARE_FIELDS,
  UPDATE_ID,
  DELETE
} from './Types'
import {
  setNestedValue,
  checkIdStructure,
  deepCopy,
  changeFieldInitial,
  replaceIdInObject,
  replaceIdInFieldsArray,
  replaceIdInValues,
  deleteDeepObject,
  deleteDeepStringsKey
} from './../Helpers/global'
import { validate, handleValidateSelect } from '../Helpers/validate'
import Events from '../Events'

export const SCS = (state) => {
  window.__current_form_state = state
  return state
}

let defaultValues = {},
  defaultTouched = {},
  defaultErros = {}

export const reduser = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case DECLARE_FIELD: {
      const { id, initial, field, doNotEmit } = payload
      const { validation, type } = field

      let { fields } = state
      let { values } = state
      values = deepCopy(values)
      const touched = { ...state.touched }
      const errors = { ...state.errors }
      const isTouched = !initial ? false : true

      for (let i = 0; i < fields.length; i++)
        if (
          fields[i].id === id &&
          fields[i].initial !== initial &&
          initial !== null &&
          initial !== undefined
        ) {
          fields[i].initial = initial
          values = {
            ...values,
            ...changeFieldInitial({ id, initial, values })
          }
          const defaultValidate = validate({
            type,
            value: initial,
            validation
          })

          touched[id] = isTouched
          if (defaultValidate) errors[id] = defaultValidate
          else delete errors[id]
          return SCS({ ...state, fields, values, touched, errors })
        } else if (fields[i].id === id) return SCS(state)

      try {
        checkIdStructure(id, fields)
      } catch (error) {
        console.error(error)
        return SCS(state)
      }

      fields = fields
        ? [{ id, initial, ...field }, ...fields]
        : [{ id, initial, ...field }]

      switch (type) {
        case 'select':
          {
            touched[id] =
              initial && initial.key !== 'placeholder' ? true : false
            const selectError = handleValidateSelect({
              value: initial,
              validation: validation
            })
            if (selectError) errors[id] = selectError
            else delete errors[id]
          }
          break
        default: {
          touched[id] = isTouched
          const defaultValidate = validate({ type, value: initial, validation })
          if (defaultValidate) errors[id] = defaultValidate
        }
      }

      if (id.toString().includes('.')) {
        values = setNestedValue(id, initial, values)
        defaultValues = setNestedValue(id, initial, defaultValues)
      } else {
        values[id] = initial
        defaultValues[id] = initial
      }

      defaultTouched[id] = touched[id]
      if (errors[id]) defaultErros[id] = errors[id]

      if (!doNotEmit)
        Events.emitFieldChange(id, {
          id,
          state,
          values,
          errors,
          touched
        })

      return SCS({
        ...state,
        values,
        touched,
        fields,
        errors
      })
    }

    case DECLARE_FIELDS: {
      let state_ = { ...state }

      if (payload) {
        const keys = Object.keys(payload)
        keys.forEach((key, index) => {
          const isSelect = typeof payload[key] === 'object'

          state_ = reduser(state_, {
            type: DECLARE_FIELD,
            payload: {
              id: key,
              initial: payload[key],
              field: { type: isSelect ? 'select' : 'non_select' },
              doNotEmit: index !== keys.length - 1
            }
          })
        })
      }

      return state_
    }

    case EDIT_FIELD: {
      const { id, value, handleChange, e, ref } = payload
      const { fields } = state
      const field = fields.find((field) => String(field.id) === String(id))
      if (!field) return SCS(state)
      const { type, name, validation } = field
      let { values } = state
      values = deepCopy(values)
      const errors = { ...state.errors }

      if (field.hasOwnProperty('onChange'))
        field.onChange({
          id,
          value,
          field,
          handleChange,
          state,
          event,
          ref
        })

      switch (type) {
        case 'select':
          if (id.toString().includes('.'))
            values = setNestedValue(id, value, values)
          else values[id] = value
          const selectError = handleValidateSelect({
            value,
            validation
          })
          if (selectError) errors[id] = selectError
          else delete errors[id]

          break
        default:
          if (id.toString().includes('.'))
            values = setNestedValue(id, value, values)
          else values[id] = value

          const error = validate({ type, value, validation })

          if (error) errors[id] = error
          else delete errors[id]
      }

      Events.emitFieldChange(id, {
        id,
        state,
        values,
        errors,
        touched: state.touched
      })

      return SCS({
        ...state,
        values,
        errors
      })
    }

    case RESET_FORM: {
      return SCS({
        ...state,
        values: defaultValues,
        touched: defaultTouched,
        errors: defaultErros
      })
    }

    case SET_TOUCHED: {
      const { id, value, handleBlur } = payload
      const { fields } = state
      const [field] = fields.filter((field) => String(field.id) === String(id))
      const touched = { ...state.touched }

      if (field && field.hasOwnProperty('onBlur'))
        field.onBlur({
          id,
          value,
          field,
          handleBlur
        })

      touched[id] = true

      Events.emitFieldChange(id, {
        id,
        state,
        values: state.values,
        errors: state.errors,
        touched
      })

      return SCS({
        ...state,
        touched
      })
    }

    case UPDATE_ID: {
      const { oldId, newId } = payload
      const { errors, fields, touched, values } = state

      let doExists = false
      for (let i = 0; i < fields.length; i++)
        if (fields[i].id.indexOf(oldId) === 0) doExists = true

      if (!doExists) return SCS(state)

      const newErrors = replaceIdInObject(errors, oldId, newId)
      const newFields = replaceIdInFieldsArray(fields, oldId, newId)
      const newTouched = replaceIdInObject(touched, oldId, newId)
      const newValues = replaceIdInValues(values, oldId, newId)

      return SCS({
        fields: newFields,
        values: { ...newValues },
        touched: newTouched,
        errors: newErrors
      })
    }
    case DELETE: {
      const { value } = payload
      let splitedValue = value.split('.')
      const { values } = state
      const { fields } = state
      const { touched } = state
      const { errors } = state

      let newFields = fields.filter((field) => {
        return !field.id.includes(value)
      })
      let newValues = deleteDeepObject(splitedValue, values)
      let newTouched = deleteDeepStringsKey(value, touched)
      let newErrors = deleteDeepObject(splitedValue, errors)

      return SCS({
        ...state,
        fields: newFields,
        values: newValues,
        touched: newTouched,
        errors: newErrors
      })
    }
    default:
      return SCS(state)
  }
}
