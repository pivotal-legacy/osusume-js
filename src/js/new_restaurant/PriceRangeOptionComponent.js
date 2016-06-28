import React from 'react'
export default function PriceRangeOptionComponent(props) {
  return (
    <option key={props.priceRange.get('id')} value={props.priceRange.get('id')}>
      {props.priceRange.get('range')}
    </option>
  )
}
