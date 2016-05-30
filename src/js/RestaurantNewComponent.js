import React from 'react';
import RestaurantSuggestionComponent from './RestaurantSuggestionComponent'

export default class RestaurantNewComponent extends React.Component {
  renderRestaurantSuggestions() {
    if (this.props.suggestions) {
      return(this.props.suggestions.map((suggestion) => {
        return (<RestaurantSuggestionComponent key={suggestion.name} suggestion={suggestion} />)
      }));
    } else {
      return null;
    }
  }

  render() {
    let input;
    return (
      <div>
        <h1>find a restaurant</h1>
        <input ref={node => {input = node}}/>
        <button onClick={_ => {this.props.fetchSuggestions(input.value)}}>find</button>
        {this.renderRestaurantSuggestions()}
      </div>
    )
  }
}
