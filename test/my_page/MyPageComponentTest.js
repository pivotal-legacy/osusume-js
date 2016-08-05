import expect from 'expect'
import { shallow, mount } from 'enzyme'
import { Link } from 'react-router'
import {fromJS} from 'immutable'

import React from 'react'
import MyPageComponent from '../../src/js/my_page/MyPageComponent'
import RestaurantListItemComponent from '../../src/js/restaurant_list/RestaurantListItemComponent'

describe('MyPageComponent', () => {
  it('displays title and name of current user', () => {
    let logoutCallback = function() {}
    let props = {
      myRestaurants: fromJS([]),
      logout: logoutCallback,
      currentUser: {name: 'Danny'}
    }
    const component = shallow(<MyPageComponent {...props} />)

    expect(component.contains(<Link to="/"><button>restaurants</button></Link>)).toBe(true)
    expect(component.contains(<h1>my page</h1>)).toBe(true)
    expect(component.contains(<span>Danny</span>)).toBe(true)
    expect(component.contains(<button className='logout' onClick={logoutCallback}>logout</button>)).toBe(true)
  })

  it('by default shows myRestaurants from props', () => {
    let restaurant = {id: 0, name: 'afuri'}
    let anotherRestaurant = {id: 1, name: 'butagmui'}
    let props = {
      myRestaurants: fromJS([restaurant, anotherRestaurant]),
      currentUser: {name: 'Danny'}
    }
    const component = shallow(<MyPageComponent {...props} />)

    expect(component.contains(<RestaurantListItemComponent restaurant={fromJS(restaurant)} />)).toBe(true)
    expect(component.contains(<RestaurantListItemComponent restaurant={fromJS(anotherRestaurant)} />)).toBe(true)
  })

  it('shows myLikedRestaurants from props when My Likes is clicked', () => {
    let restaurant = {id: 0, name: 'afuri'}
    let anotherRestaurant = {id: 1, name: 'butagmui'}

    let props = {
      myRestaurants: fromJS([]),
      myLikedRestaurants: fromJS([restaurant, anotherRestaurant]),
      currentUser: {name: 'Danny'}
    }
    const component = shallow(<MyPageComponent {...props} />)
    const instance = component.instance()

    component.find('.my-likes').simulate('click')

    expect(component.contains(<RestaurantListItemComponent restaurant={fromJS(restaurant)} />)).toBe(true)
    expect(component.contains(<RestaurantListItemComponent restaurant={fromJS(anotherRestaurant)} />)).toBe(true)
    expect(component.contains(<button className='my-posts' onClick={instance.myPostsClicked}>my posts</button>)).toBe(true)
    expect(component.contains(<button className='my-likes' onClick={instance.myLikesClicked}>my likes</button>)).toBe(false)
  })

  it('call myPostsClicked when My Posts is clicked', () => {
    let restaurant = {id: 0, name: 'afuri'}
    let anotherRestaurant = {id: 1, name: 'butagmui'}
    let props = {
      myRestaurants: fromJS([restaurant, anotherRestaurant]),
      myLikedRestaurants: fromJS([]),
      currentUser: {name: 'Danny'}
    }

    const component = shallow(<MyPageComponent {...props} />)
    const instance = component.instance()

    component.find('.my-likes').simulate('click')
    component.find('.my-posts').simulate('click')

    expect(component.contains(<RestaurantListItemComponent restaurant={fromJS(restaurant)} />)).toBe(true)
    expect(component.contains(<RestaurantListItemComponent restaurant={fromJS(anotherRestaurant)} />)).toBe(true)
    expect(component.contains(<button className='my-likes' onClick={instance.myLikesClicked}>my likes</button>)).toBe(true)
    expect(component.contains(<button className='my-posts' onClick={instance.myPostsClicked}>my posts</button>)).toBe(false)
})

  it('fetches the restaurant if there is no restaurants available in props', () => {
    let props = {
      myRestaurants: fromJS([]),
      fetchRestaurants: expect.createSpy(),
      currentUser: {name: 'Danny'}
    }
    expect(props.fetchRestaurants.calls.length).toBe(0)
    mount(<MyPageComponent {...props} />)
    expect(props.fetchRestaurants.calls.length).toBe(1)
  })

  it('does not fetch the restaurant if there are restaurants available in props', () => {
    let props = {
      myRestaurants: fromJS([
        {
          id: 0,
          name: 'afuri',
          cuisine: {},
          price_range: {}
        }
      ]),
      fetchRestaurants: expect.createSpy(),
      currentUser: {name: 'Danny'}
    }
    expect(props.fetchRestaurants.calls.length).toBe(0)
    mount(<MyPageComponent {...props} />)
    expect(props.fetchRestaurants.calls.length).toBe(0)
  })

})
