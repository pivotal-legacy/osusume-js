import React from 'react'

export default function PriceRangeSelectionComponent(props) {
  const priceRanges = props.priceRanges.map((priceRange) => {
    return (
      <option key={priceRange.get('id')} value={priceRange.get('id')}>
        {priceRange.get('range')}
      </option>
    )
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
