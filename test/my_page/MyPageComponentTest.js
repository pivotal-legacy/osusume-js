import expect from 'expect'
import { shallow, mount } from 'enzyme'
import { Link } from 'react-router'

import React from 'react'
import MyPageComponent from '../../src/js/my_page/MyPageComponent'
import RestaurantListItemComponent from '../../src/js/restaurant_list/RestaurantListItemComponent'

describe('MyPageComponent', () => {
  afterEach(() => {
    localStorage.clear()
  })

  it('displays title and name of current user', () => {
    localStorage.setItem('userName', 'Danny')
    let logoutCallback = function() {}
    const component = shallow(<MyPageComponent myRestaurants={[]} logout={logoutCallback} />)

    expect(component.contains(<Link to="/"><button>restaurants</button></Link>)).toBe(true)
    expect(component.contains(<h1>my page</h1>)).toBe(true)
    expect(component.contains(<span>Danny</span>)).toBe(true)
    expect(component.contains(<button className='logout' onClick={logoutCallback}>logout</button>)).toBe(true)
  })

  it('by default shows myRestaurants from props', () => {
    let restaurant = {id: 0, name: 'afuri'}
    let anotherRestaurant = {id: 1, name: 'butagmui'}
    const component = shallow(<MyPageComponent myRestaurants={[restaurant, anotherRestaurant]} />)

    expect(component.contains(<RestaurantListItemComponent restaurant={restaurant} />)).toBe(true)
    expect(component.contains(<RestaurantListItemComponent restaurant={anotherRestaurant} />)).toBe(true)
  })

  it('shows myLikedRestaurants from props when My Likes is clicked', () => {
    let restaurant = {id: 0, name: 'afuri'}
    let anotherRestaurant = {id: 1, name: 'butagmui'}
    const component = shallow(<MyPageComponent myRestaurants={[]} myLikedRestaurants={[restaurant, anotherRestaurant]} />)

    component.find('.my-likes').simulate('click')

    expect(component.contains(<RestaurantListItemComponent restaurant={restaurant} />)).toBe(true)
    expect(component.contains(<RestaurantListItemComponent restaurant={anotherRestaurant} />)).toBe(true)
  })

  it('fetches the restaurant if there is no restaurants available in props', () => {
    let props = {
      myRestaurants: [],
      fetchRestaurants: expect.createSpy()
    }
    expect(props.fetchRestaurants.calls.length).toBe(0)
    mount(<MyPageComponent {...props} />)
    expect(props.fetchRestaurants.calls.length).toBe(1)
  })

  it('does not fetch the restaurant if there are restaurants available in props', () => {
    let props = {
      myRestaurants: [{id: 0, name: 'afuri'}],
      fetchRestaurants: expect.createSpy()
    }
    expect(props.fetchRestaurants.calls.length).toBe(0)
    mount(<MyPageComponent {...props} />)
    expect(props.fetchRestaurants.calls.length).toBe(0)
  })

})
