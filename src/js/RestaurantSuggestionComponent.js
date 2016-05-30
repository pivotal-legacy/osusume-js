import React from 'react';

export default class RestaurantSuggestionComponent extends React.Component {
  render() {
    return (
      <div>
        <span>{this.props.suggestion.name}</span>
        <span>{this.props.suggestion.address}</span>
      </div>
    )
  }
}
