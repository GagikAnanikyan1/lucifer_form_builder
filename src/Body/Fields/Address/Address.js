import React, { Fragment } from 'react'
import { Input } from 'boomform'
import { Select } from 'boomform'
import {
  getPlaceholder,
  getInitial,
  getValidation
} from './../../../Helpers/global'
import { getAddressFields, countryList } from './../../../Helpers/address'

const Address = ({
  id,
  label,
  hide,
  classnameprefix,
  placeholders,
  initials,
  validations,
  defaultCountry,
  payment,
  ...props
}) => {
  const fields = getAddressFields()

  return (
    <>
      {hide?.includes('street') ? null : (
        <span className='address__street'>
          <Input
            {...props}
            key={`${id}.street`}
            id={`${id}.street`}
            type='text'
            placeholder={getPlaceholder(placeholders, 'street')}
            initial={getInitial(initials, 'street')}
            validation={getValidation(validations, 'street')}
          />
        </span>
      )}
      {hide?.includes('street2') ? null : (
        <span className='address__street2'>
          <Input
            {...props}
            key={`${id}.street2`}
            id={`${id}.street2`}
            type='text'
            placeholder={getPlaceholder(placeholders, 'street2')}
            initial={getInitial(initials, 'street2')}
            validation={getValidation(validations, 'street2')}
          />
        </span>
      )}
      <div>
        {hide?.includes('city') ? null : (
          <span className='address__city'>
            <Input
              {...props}
              key={`${id}.city`}
              id={`${id}.city`}
              type='text'
              placeholder={getPlaceholder(placeholders, 'city')}
              initial={getInitial(initials, 'city')}
              validation={getValidation(validations, 'city')}
            />
          </span>
        )}
        {hide?.includes('state') ? null : (
          <span className='address__state'>
            <Input
              {...props}
              key={`${id}.state`}
              id={`${id}.state`}
              type='text'
              placeholder={getPlaceholder(placeholders, 'state')}
              initial={getInitial(initials, 'state')}
              validation={getValidation(validations, 'state')}
            />
          </span>
        )}
      </div>
      <div>
        {hide?.includes('zip') ? null : (
          <span className='address__zip'>
            <Input
              {...props}
              key={`${id}.zip`}
              id={`${id}.zip`}
              type='text'
              placeholder={getPlaceholder(placeholders, 'zip')}
              initial={getInitial(initials, 'zip')}
              validation={getValidation(validations, 'zip')}
            />
          </span>
        )}
        {hide?.includes('country') ? null : (
          <span className='address__country'>
            <Select
              {...props}
              key={`${id}.country`}
              id={`${id}.country`}
              options={
                getPlaceholder(placeholders, 'country')
                  ? [
                      {
                        key: 'placeholder',
                        value: ` -- ${getPlaceholder(
                          placeholders,
                          'country'
                        )} -- `
                      },
                      ...countryList
                    ]
                  : countryList
              }
              initial={defaultCountry}
            />
          </span>
        )}
      </div>
    </>
  )
}

export default Address
