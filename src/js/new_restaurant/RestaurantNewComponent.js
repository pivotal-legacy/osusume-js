import React from 'react';
import RestaurantSuggestionComponent from './RestaurantSuggestionComponent'
import ContainerRestaurantNewFormComponent from './ContainerRestaurantNewFormComponent'

export default class RestaurantNewComponent extends React.Component {
  constructor(props) {
    super(props)
    this.selectSuggestion = this.selectSuggestion.bind(this)
    this.state = {suggestion: undefined}
  }

  renderHeader() {
    if (this.state.suggestion == undefined) {
      return <h1>find a restaurant</h1>;
    } else {
      return <h1>add a restaurant</h1>;
    }
  }

  renderFindRestaurantInput() {
    if (this.state.suggestion == undefined) {
      let input;
      return (
        <div>
          <input ref={node => {input = node}}/>
          <button onClick={_ => {this.props.fetchSuggestions(input.value)}}>find</button>
        </div>
      );
    } else {
      return null;
    }
  }

  selectSuggestion(suggestion) {
    this.setState({suggestion: suggestion})
  }

  renderRestaurantSuggestions() {
    if (this.state.suggestion == undefined && this.props.suggestions) {
      return(this.props.suggestions.map((suggestion) => {
        return (
          <RestaurantSuggestionComponent key={suggestion.name}
                                         suggestion={suggestion}
                                         selectSuggestion={this.selectSuggestion}/>
        )
      }));
    } else {
      return null;
    }
  }

  renderForm() {
    if (this.state.suggestion != undefined) {
      return <ContainerRestaurantNewFormComponent suggestion={this.state.suggestion} />
    } else {
      return null
    }
  }

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderFindRestaurantInput()}
        {this.renderRestaurantSuggestions()}
        {this.renderForm()}
      </div>
    )
  }
}
