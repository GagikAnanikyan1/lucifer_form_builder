import React, { memo, Fragment } from 'react'
import classNames from 'classnames/bind'
import GridLayout from 'react-grid-layout'
import Field from './Field'
import 'react-grid-layout/css/styles.css'

const generatePageItems = (fields, pageFields, payment) => {
  return fields
    .filter((field) => pageFields.includes(field.id))
    .map((field) => {
      const { prefix, postfix, classnameprefix, id } = field
      return (
        <div
          id={`field-${id}`}
          className={classNames('boomForm_field', {
            [classnameprefix &&
            classnameprefix
              .map((value) => `${value}-field__content`)
              .join(' ')]: classnameprefix && classnameprefix.length
          })}
          key={field.id}
        >
          {prefix && (
            <span
              dangerouslySetInnerHTML={{
                __html: prefix
              }}
            />
          )}
          <Field key={field.id} payment={payment} {...field} />
          {postfix && (
            <span
              dangerouslySetInnerHTML={{
                __html: postfix
              }}
            />
          )}
        </div>
      )
    })
}

const Fields = ({ fields, payment, printableFields, gridOptions }) => {
  const {
    layout = [],
    isBounded = false,
    isDraggable = false,
    isResizable = false,
    margin = [0, 0],
    containerPadding = [0, 0],
    rowHeight = 1,
    width = 800,
    cols = 4
  } = gridOptions
  return (
    <>
      {printableFields.map((pageFields, index) => {
        const layout_ = [] // layout for grid layout
        if (gridOptions && gridOptions.layout) {
          //this loop needed for passing only rendering fields layouts
          pageFields.forEach((id) => {
            layout_.push({ i: `${id}`, ...layout[id] })
          })
        }
        return (
          <div key={'page' + index} className='boomForm-fields'>
            {gridOptions && gridOptions.layout ? (
              <GridLayout
                className='grid-layout'
                isDroppable={false}
                cols={cols}
                margin={margin}
                containerPadding={containerPadding}
                rowHeight={rowHeight}
                width={width}
                isBounded={isBounded}
                isDraggable={isDraggable}
                isResizable={isResizable}
                layout={layout_}
              >
                {generatePageItems(fields, pageFields, payment)}
              </GridLayout>
            ) : (
              <>{generatePageItems(fields, pageFields, payment)}</>
            )}
          </div>
        )
      })}
    </>
  )
}

export default memo(Fields)
