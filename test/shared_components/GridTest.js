import expect from 'expect'
import { shallow } from 'enzyme'
import React from 'react'
import Grid from '../../src/js/shared_components/Grid'
import { Row, Col } from 'pui-react-grids'

describe('Grid', () => {
  it('displays items in a single row', () => {
    let items = ["item1", "item2"]
    const component = shallow(<Grid items={items} numColumns={5}/>)

    expect(component.contains(
      <div>
        <Row>
          <Col md={6}>item1</Col>
          <Col md={6}>item2</Col>
        </Row>
      </div>
    )).toBe(true)
  })

  it('displays items on multiple rows', () => {
    let items = ["item1", "item2", "item3"]
    const component = shallow(<Grid items={items} numColumns={2}/>)

    expect(component.contains(
      <div>
        <Row>
          <Col md={6}>item1</Col>
          <Col md={6}>item2</Col>
        </Row>
        <Row>
          <Col md={6}>item3</Col>
        </Row>
      </div>
    )).toBe(true)
  })

})
