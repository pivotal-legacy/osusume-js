import React from 'react';

export default class PriceRangeSelectionComponent extends React.Component {
  renderPriceRanges() {
    if (this.props.priceRanges) {
      return(
        <select>
          {this.renderOptions()}
        </select>
      )
    } else {
      return null;
    }
  }

  renderOptions() {
    return this.props.priceRanges.map((priceRange) => {
      return (
        <option key={priceRange.id} value={priceRange.id}>{priceRange.range}</option>
      )
    })
  }

  render() {
    return this.renderPriceRanges();
  }
}
