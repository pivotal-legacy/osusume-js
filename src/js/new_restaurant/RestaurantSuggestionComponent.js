import React from 'react';

export default class RestaurantSuggestionComponent extends React.Component {
  render() {
    return (
      <div className="restaurant-suggestion" onClick={_ => {this.props.selectSuggestion(this.props.suggestion)}}>
        <span>{this.props.suggestion.name}</span>
        <span>{this.props.suggestion.address}</span>
      </div>
    )
  }
}
