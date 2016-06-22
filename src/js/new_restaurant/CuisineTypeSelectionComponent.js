import React from 'react';

export default class CuisineTypeSelectionComponent extends React.Component {
  constructor(props) {
    super(props)
    this.onChangeSelectValue = this.onChangeSelectValue.bind(this)
  }

  renderCuisineTypes() {
    if (this.props.cuisineTypes) {
      return(
        <select onChange={this.onChangeSelectValue}>
          <option>Select a cuisine</option>
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
    return this.props.cuisineTypes.map((cuisineType) => {
      return (
        <option key={cuisineType.get('id')} value={cuisineType.get('id')}>{cuisineType.get('name')}</option>
      )
    })
  }

  render() {
    return this.renderCuisineTypes();
  }
}
