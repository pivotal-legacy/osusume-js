import React from 'react'
import PriceRangeOptionComponent from './PriceRangeOptionComponent'

export default function PriceRangeSelectionComponent(props) {
  const priceRanges = props.priceRanges.map((priceRange) => {
    return (<PriceRangeOptionComponent key={priceRange.get('id')} priceRange={priceRange} />)
  })

  const onChange = (e) => {
    const index = e.target.options.selectedIndex
    props.changeHandler(e.target.options[index].value)
  }

  return (
    <select className='price-range' onChange={onChange} defaultValue={props.selectedPriceRange}>
      <option>Select a price range</option>
      {priceRanges}
    </select>
  )
}
