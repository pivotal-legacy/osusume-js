import React from 'react';

export default class CuisineTypeSelectionComponent extends React.Component {
  renderCuisineTypes() {
    if (this.props.cuisineTypes) {
      return(
        <select>
          <option>Select a cuisine</option>
          {this.renderOptions()}
        </select>
      )
    } else {
      return null;
    }
  }

  renderOptions() {
    return this.props.cuisineTypes.map((cuisineType) => {
      return (
        <option key={cuisineType.id} value={cuisineType.id}>{cuisineType.name}</option>
      )
    })
  }

  render() {
    return this.renderCuisineTypes();
  }
}
