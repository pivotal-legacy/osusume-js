import React from "react"
import { Row, Col } from 'pui-react-grids'

export default class Grid extends React.Component {
  render() {
    function createRow(itemsInRow, index) {
      let row = itemsInRow.map((item, index) => {
        return (<Col md={6} key={index}>{item}</Col>)
      })

      return (
        <Row key={index}>
          {row}
        </Row>
      )
    }

    let items = this.props.items
    let numColumns = this.props.numColumns

    if ( items ) {
      var grid = []
      for (var i = 0 ; i < items.length ; i += numColumns) {
        let currentRowItems = items.slice(i, i + numColumns)
        grid.push(createRow(currentRowItems, i))
      }
    }

    return (
      <div>
        {grid}
      </div>
    )
  }
}
