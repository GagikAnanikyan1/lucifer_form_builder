import React, { useEffect, useRef, useState } from 'react'
import { Builder } from 'boomform-builder'
import Editor from '@monaco-editor/react'
import defaultOptions from './options'
import { debounce } from '../Helpers/debounce'
import './index.css'

function Content({ example }) {
  const { name, option } = example
  const outputRef = useRef(null)
  const [options, setOptions] = useState(defaultOptions[option])
  const [autoSave, setAutoSave] = useState(false)

  function handleSave() {
    try {
      const parsData = JSON.parse(outputRef.current)
      setOptions(parsData)
    } catch (e) {
      if (autoSave) return
      alert(`There is an error in JSON :) `)
    }
  }

  useEffect(() => {
    setOptions(defaultOptions[option])
    outputRef.current = JSON.stringify(defaultOptions[option], null, 3)
    // eslint-disable-next-line
  }, [example.name])

  return (
    <div className='content'>
      <h1>{name}</h1>
      <div className='editorAndPreview'>
        <div className='editor'>
          <div>
            <button onClick={handleSave}> Save </button>
            <span>
              <input
                type='checkbox'
                value={autoSave}
                onChange={() => setAutoSave(!autoSave)}
              />{' '}
              AutoSave (500ms delay)
            </span>
          </div>
          <Editor
            height={'600px'}
            width={'500px'}
            defaultLanguage='json'
            value={JSON.stringify(options, null, 3)}
            onChange={(value) => {
              outputRef.current = value
              if (autoSave) {
                debounce(
                  'code_editor_change',
                  () => {
                    handleSave()
                  },
                  500
                )
              }
            }}
            theme='vs-dark'
          />
        </div>
        <div className='preview'>
          <Builder
            global={{
              name: name
            }}
            button={{
              text: 'Submit'
            }}
            {...options}
          />
        </div>
      </div>
    </div>
  )
}
export default Content
