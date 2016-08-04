import React from 'react'

export default class DropDownMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: props.defaultValue }
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  getValue() {
    return this.state.value
  }

  render() {
    const options = this.props.options.map((option) =>
      <option key={option.value} value={option.value.toString()}>{option.label}</option>)

    return (
      <select
        value={this.state.value}
        onChange={this.handleChange.bind(this)}
        className={this.props.className || ''}>
        {options}
      </select>
    )
  }
}

DropDownMenu.propTypes = {
  className: React.PropTypes.string,
  defaultValue: React.PropTypes.string,
  options: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      label: React.PropTypes.string.isRequired,
      value: React.PropTypes.string.isRequired
    }).isRequired
  ).isRequired
}
