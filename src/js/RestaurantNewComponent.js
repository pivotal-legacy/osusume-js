import React from 'react';
import RestaurantSuggestionComponent from './RestaurantSuggestionComponent'

export default class RestaurantNewComponent extends React.Component {
  renderFindRestaurantInput() {
    if (this.props.suggestion == undefined) {
      let input;
      return (
        <div>
          <h1>find a restaurant</h1>
          <input ref={node => {input = node}}/>
          <button onClick={_ => {this.props.fetchSuggestions(input.value)}}>find</button>
        </div>
      );
    } else {
      return null;
    }
  }

  renderRestaurantSuggestions() {
    if (this.props.suggestion == undefined && this.props.suggestions) {
      return(this.props.suggestions.map((suggestion) => {
        return (
          <RestaurantSuggestionComponent key={suggestion.name}
                                         suggestion={suggestion}
                                         selectSuggestion={this.props.selectSuggestion}/>
        )
      }));
    } else {
      return null;
    }
  }

  renderSelectedSuggestion() {
    let suggestion = this.props.suggestion;
    if (suggestion != undefined) {
      return (
        <div>
          <h1>{suggestion.name}</h1>
          <div>{suggestion.address}</div>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div>
        {this.renderFindRestaurantInput()}
        {this.renderRestaurantSuggestions()}
        {this.renderSelectedSuggestion()}
      </div>
    )
  }
}
