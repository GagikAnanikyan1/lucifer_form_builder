import React, { useState } from 'react'
import { BoomForm, Input, useField } from 'boomform'

const Barev = ({ x }) => {
  const { neededValues } = useField(['qwe'])

  console.log('neededValues', neededValues)

  return <div>{x}</div>
}

const Hajox = () => {
  const [x, setX] = useState(0)

  return (
    <>
      <div onClick={() => setX(x + 1)}>Barev</div>
      <Barev x={x} />
      <Input id='qwe' placeholder='Barev' />
    </>
  )
}

const App = () => {
  return (
    <BoomForm>
      {({ updateId }) => (
        <>
          <Hajox />
        </>
      )}
    </BoomForm>
  )
}

export default App
