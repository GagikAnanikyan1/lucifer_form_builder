import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Content from './Content'

const App = () => {
  const [example, setExample] = useState({ name: 'Logic', option: 'logic' })
  return (
    <>
      <Sidebar example={example} setExample={setExample} />
      <Content example={example} />
    </>
  )
}

export default App
