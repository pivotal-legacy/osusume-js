import React from 'react'
import ContainerRestaurantForm from './ContainerRestaurantForm'
import ContainerRestaurantSearch from './ContainerRestaurantSearch'

export default class AddRestaurantPage extends React.Component {
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
      return <ContainerRestaurantSearch restaurantSuggestionSelected={this.restaurantSuggestionSelected}/>
    } else {
      return <ContainerRestaurantForm suggestion={this.state.suggestion} findRestaurantClicked={this.findRestaurantClicked}/>
    }
  }
}
