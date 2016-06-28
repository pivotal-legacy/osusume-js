import React from 'react'
import ContainerRestaurantNewFormComponent from './ContainerRestaurantNewFormComponent'
import FindRestaurantComponent from './FindRestaurantComponent'

export default class RestaurantNewComponent extends React.Component {
  constructor(props) {
    super(props)
    this.selectSuggestion = this.selectSuggestion.bind(this)
    this.state = {suggestion: undefined}
  }

  selectSuggestion(suggestion) {
    this.setState({suggestion: suggestion})
  }

  render() {
    let component
    if (this.state.suggestion == undefined) {
      component = <FindRestaurantComponent
        suggestions={this.props.suggestions}
        fetchSuggestions={this.props.fetchSuggestions}
        selectSuggestion={this.selectSuggestion}
      />
    } else {
      component = <ContainerRestaurantNewFormComponent suggestion={this.state.suggestion} />
    }

    return (
      <div>
        {component}
      </div>
    )
  }
}
