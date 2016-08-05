import React from 'react'

export default class RestaurantSearchResultComponent extends React.Component {
  render() {
    return (
      <div className="restaurant-suggestion" onClick={_ => {this.props.restaurantSuggestionSelected(this.props.suggestion)}}>
        <span>{this.props.suggestion.name}</span>
        <span>{this.props.suggestion.address}</span>
      </div>
    )
  }
}
