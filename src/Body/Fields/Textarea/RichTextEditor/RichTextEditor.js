import { Custom, Input } from 'boomform'
import React, { useRef, Fragment } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { formats, modules } from './../../../../Helpers/textarea'

const RichTextEditor = (props) => {
  const { id, placeholder, validation, editorModules } = props

  const validationField = useRef()

  return (
    <Custom id={id} {...props}>
      {({ handleChange, handleBlur, value }) => {
        return (
          <>
            <div
              onBlur={(e) => {
                if (validation.HTMLValidate === true) {
                  const validationInput = validationField.current.firstChild
                  validationInput.focus()
                  validationInput.blur()
                }

                handleBlur({ id })
              }}
            >
              <ReactQuill
                placeholder={placeholder}
                theme='snow'
                onChange={(content) => {
                  if (content === '<p><br></p>') content = ''
                  handleChange({
                    id,
                    value: content,
                    e: content,
                    field: props
                  })
                }}
                value={value}
                modules={editorModules || modules}
                formats={formats}
              />
            </div>
            {validation.HTMLValidate === true && (
              <div
                ref={validationField}
                style={{
                  overflow: 'hidden',
                  height: '0',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <Input maxLength='0' {...props} type='text' />
              </div>
            )}
          </>
        )
      }}
    </Custom>
  )
}

export default RichTextEditor
