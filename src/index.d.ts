/// <reference types="typescript" />

interface IValidation {
  required?: { msg: string }
  HTMLValidate?: boolean
  min?: { msg: string; type: number | string; value: number | string }
  max?: { msg: string; type: number | string; value: number | string }
  email?: { msg: string }
  phone?: { msg: string }
  url?: { msg: string }
  regEx?: { msg: string; value: string }
  custom?(values: string[]): string | boolean
}

type UseField = (ids: string[]) => {
  id: string | number
  ids: string[]
  value: string
  touched: boolean
  neededValues: { [key: string]: any }
  newValues: { [key: string]: any }
  newErrors: { [key: string]: string }
  newTouched: { [key: string]: string }
  prevState: {
    errors: { [key: string]: string }
    touched: { [key: string]: boolean }
    values: { [key: string]: any }
    fields: {
      id: string | number
      initial: null | string
      type?: string | undefined
    }[]
  }
}

interface IBoomFormProps {
  children: (
    declareFields: any,
    declareField: any,
    handleReset: any,
    handleChange: any,
    handleBlur: any,
    handleClick: any,
    getAndChange: any,
    updateId: any
  ) => React.ReactNode
  fields?: ReadonlyArray<any>
  initials?: any
}

interface IInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'id'> {
  id: string | number
  type?: 'text' | 'number' | 'password' | 'phone' | 'email'
  initial?: string
  validation?: Pick<
    IValidation,
    | 'HTMLValidate'
    | 'required'
    | 'email'
    | 'max'
    | 'min'
    | 'phone'
    | 'url'
    | 'regEx'
    | 'custom'
  >
}

interface ITextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'id'> {
  id: string | number
  initial?: string
  validation?: Pick<
    IValidation,
    | 'HTMLValidate'
    | 'required'
    | 'email'
    | 'max'
    | 'min'
    | 'phone'
    | 'url'
    | 'regEx'
    | 'custom'
  >
}

interface IFileProps
  extends Omit<
    Exclude<React.InputHTMLAttributes<HTMLInputElement>, 'type'>,
    'id'
  > {
  id: string | number
  validation?: Pick<IValidation, 'required' | 'HTMLValidate'>
}

interface ISelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'id'> {
  id: string | number
  initial: string
  options: { key: string | number; value: string }[]
  validation?: Pick<IValidation, 'required' | 'HTMLValidate'>
}

interface ICheckboxProps
  extends Omit<
    Exclude<React.InputHTMLAttributes<HTMLInputElement>, 'type'>,
    'id' | 'name'
  > {
  id: string | number
  initial?: string
  name: string | number
  value: any
  validation?: Pick<IValidation, 'required' | 'HTMLValidate'>
}

interface IRadioProps
  extends Omit<
    Exclude<React.InputHTMLAttributes<HTMLInputElement>, 'type'>,
    'id' | 'name'
  > {
  id: string | number
  initial?: string
  name: string | number
  value: any
  validation?: Pick<IValidation, 'required' | 'HTMLValidate'>
}

interface ICustomProps {
  id: string | number
  children: (
    id: any,
    handleChange: any,
    getAndChange: any,
    handleBlur: any,
    handleClick: any,
    value: any,
    values: any,
    errors: any,
    fields: any,
    touched: any
  ) => React.ReactNode
}

interface IErrorProps {
  id: string | number
}

declare module 'boomform' {
  export const useField: UseField

  export const BoomForm: React.FC<IBoomFormProps>

  export const Input: React.FC<IInputProps>

  export const Textarea: React.FC<ITextareaProps>

  export const File: React.FC<IFileProps>

  export const Checkbox: React.FC<ICheckboxProps>

  export const Select: React.FC<ISelectProps>

  export const Radio: React.FC<IRadioProps>

  export const Custom: React.FC<ICustomProps>

  export const Error: React.FC<IErrorProps>

  export const Context: React.createContext<any>

  export type DeclareFields = any

  export type InputValidationType = IInputProps['validation']

  export type TextareaValidationType = ITextareaProps['validation']

  export type FileValidationType = IFileProps['validation']

  export type CheckboxValidationType = ICheckboxProps['validation']

  export type SelectValidationType = ISelectProps['validation']

  export type RadioValidationType = IRadioProps['validation']
}
