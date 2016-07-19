import React from "react"

export default class ListComponent extends React.Component {
  render() {
    let items
    if ( this.props.items ) {
      items = this.props.items.map((item, index) => {
        return (<div key={index}>{item}</div>)
      })
    }

    return (
      <div>
        {items}
      </div>
    )
  }
}
