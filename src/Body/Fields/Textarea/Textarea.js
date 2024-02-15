import React from 'react'
import { Textarea as TextareaInput } from 'boomform'
import RichTextEditor from './RichTextEditor/RichTextEditor'

const Textarea = ({ richTextEditor, payment, ...props }) => {
  if (richTextEditor) return <RichTextEditor {...props} />
  else return <TextareaInput {...props} />
}

export default Textarea
