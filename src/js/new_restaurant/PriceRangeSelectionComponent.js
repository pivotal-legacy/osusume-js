import React from 'react';

export default class PriceRangeSelectionComponent extends React.Component {
  constructor(props) {
    super(props)
    this.onChangeSelectValue = this.onChangeSelectValue.bind(this)
  }

  renderPriceRanges() {
    if (this.props.priceRanges) {
      return(
        <select onChange={this.onChangeSelectValue}>
          <option>Select a price range</option>
          {this.renderOptions()}
        </select>
      )
    } else {
      return null;
    }
  }

  onChangeSelectValue(e) {
    let index = e.target.options.selectedIndex
    let value = e.target.options[index].value
    this.props.changeHandler(value)
  }

  renderOptions() {
    return this.props.priceRanges.map((priceRange) => {
      return (
        <option key={priceRange.get('id')} value={priceRange.get('id')}>{priceRange.get('range')}</option>
      )
    })
  }

  render() {
    return this.renderPriceRanges();
  }
}
