import React from 'react'
import RestaurantSearchResultComponent from './RestaurantSearchResultComponent'

export default class RestaurantSearchComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: ''
    }
  }

  inputChanged(event) {
    this.setState({searchTerm: event.target.value})
  }

  render() {
    let suggestions = (this.props.suggestions.map((suggestion) => {
      return (
        <RestaurantSearchResultComponent key={suggestion.place_id}
                                         suggestion={suggestion}
                                         restaurantSuggestionSelected={this.props.restaurantSuggestionSelected}/>
      )
    }))

    return (
      <div>
        <h1>find a restaurant</h1>
        <input ref="searchInput" onChange={this.inputChanged.bind(this)}/>
        <button disabled={this.state.searchTerm.length == 0}
                onClick={_ => {this.props.fetchSuggestions(this.refs.searchInput.value)}}>find</button>
        {suggestions}
      </div>
    )
  }
}
