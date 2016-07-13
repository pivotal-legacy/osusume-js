import React from 'react'
import ContainerRestaurantFormComponent from './ContainerRestaurantFormComponent'
import ContainerRestaurantSearchComponent from './ContainerRestaurantSearchComponent'

export default class AddRestaurantComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {showSearch: false, suggestion: null}
    this.findRestaurantClicked = this.findRestaurantClicked.bind(this)
    this.restaurantSuggestionSelected = this.restaurantSuggestionSelected.bind(this)
  }

  findRestaurantClicked() {
    this.setState({showSearch: true})
  }

  restaurantSuggestionSelected(selectedSuggestion) {
    const state = {
      suggestion: selectedSuggestion,
      showSearch: false
    }
    this.setState(state)
  }

  render() {
    if (this.state.showSearch) {
      return <ContainerRestaurantSearchComponent restaurantSuggestionSelected={this.restaurantSuggestionSelected}/>
    } else {
      return <ContainerRestaurantFormComponent suggestion={this.state.suggestion} findRestaurantClicked={this.findRestaurantClicked}/>
    }
  }
}
