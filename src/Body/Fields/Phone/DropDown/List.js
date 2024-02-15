import React from 'react'
import classNames from 'classnames/bind'

import countries from '../../../../Helpers/countries'

const List = ({ id, values, selectedKey, handleCodeChange }) => {
  return Object.values(countries)
    .filter((country) => {
      const searchTerm = values[id]?.search
      if (searchTerm === null || searchTerm === undefined) return true

      if (
        country.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        country.key.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
        country.dial_code.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
      )
        return true

      return false
    })
    .map((country) => {
      const { key, dial_code, name } = country

      return (
        <div
          id={`country_item${id}`}
          className={classNames('country_code_item', {
            selected: selectedKey === key
          })}
          onClick={() => handleCodeChange(key)}
          key={key}
        >
          <div
            className='country_code_item_img'
            style={{
              backgroundImage: `url(https://cdn.boomte.ch/images/flags/${key.toLowerCase()}.svg)`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          ></div>
          <span className='country_code_item_txt'>
            <span>{name}</span>
            <span>({dial_code})</span>
          </span>
        </div>
      )
    })
}

export default List
