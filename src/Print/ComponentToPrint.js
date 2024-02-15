import React from 'react'
import Table from './Table'

const ComponentToPrint = ({ fields, name, description }) => {
  return (
    <div id='componentToPrint'>
      <h2>{name}</h2>
      <h3>{description}</h3>
      <Table fields={fields} />
    </div>
  )
}

export default ComponentToPrint
