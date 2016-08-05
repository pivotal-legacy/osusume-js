import expect from 'expect'
import { mount, shallow } from 'enzyme'
import { Link } from 'react-router'
import {fromJS} from 'immutable'

import React from 'react'
import RestaurantDetailComponent from '../../src/js/restaurant_detail/RestaurantDetailComponent'
import CommentComponent from '../../src/js/restaurant_detail/CommentComponent'
import CommentFormComponent from '../../src/js/restaurant_detail/CommentFormComponent'

describe('RestaurantDetailComponent', () => {
  it('displays the restaurant passed in props', () => {
    let comments = [{
      comment: 'I love it',
      created_at: "2016-06-09T07:21:52.211Z",
      id: 1,
      user: {
        name: 'Danny'
      }
    }]
    let restaurant = fromJS({
      id: 0,
      name: 'Afuri',
      cuisine: {name: "Japanese"},
      price_range: {range: '¥0~999'},
      user: {id: 0, email: "danny", name: "Danny"},
      address: "Roppongi Hills",
      place_id: 'some-place-id',
      notes: "good",
      liked: false,
      photo_urls: [{url: 'https://hoge/image.jpg'}, {url: 'https://hoge/image2.jpg'}],
      num_likes: 5,
      created_at: "2016-05-26T10:03:17.736Z",
      updated_at: "2016-05-27T10:03:17.736Z"
    })
    let currentUser = {id: 0, name: 'Danny'}
    let createCommentCallback = function() {}
    let likeCallback = function() {}
    let removeLikeCallback = function() {}
    const component = shallow(<RestaurantDetailComponent restaurant={restaurant} comments={comments} createComment={createCommentCallback} like={likeCallback} removeLike={removeLikeCallback} currentUser={currentUser}/>)
    expect(component.contains(<Link to='/'><button className='restaurant-link'>restaurants</button></Link>)).toBe(true)
    expect(component.contains(<h1>Afuri</h1>)).toBe(true)
    expect(component.contains(<img key={0} src='https://hoge/image.jpg' width={210}  />)).toBe(true)
    expect(component.contains(<img key={1} src='https://hoge/image2.jpg' width={210}  />)).toBe(true)
    expect(component.contains(<div className="cuisine">Japanese</div>)).toBe(true)
    expect(component.contains(<div className="price-range">¥0~999</div>)).toBe(true)
    expect(component.contains(<div className="date">5/27/2016 by Danny</div>)).toBe(true)
    expect(component.contains(<span>Roppongi Hills</span>)).toBe(true)
    expect(component.contains(<Link to='/restaurants/0/map/some-place-id'><button className='map-link'>view map</button></Link>)).toBe(true)
    expect(component.contains(<div className="notes">good</div>)).toBe(true)
    expect(component.contains(<span className="num-likes">5 likes</span>)).toBe(true)
    expect(component.contains(<button onClick={likeCallback}>like</button>)).toBe(true)
    expect(component.contains(<button onClick={removeLikeCallback}>remove like</button>)).toBe(false)
    expect(component.contains(<CommentFormComponent createComment={createCommentCallback} />)).toBe(true)
    expect(component.contains(<CommentComponent key={0} comment={comments[0]} />)).toBe(true)
  })

  it('shows delete button if restaurant is owned by current_user', () => {
    let props = {
      restaurant: fromJS({
        id: 0,
        name: 'Afuri',
        cuisine: {name: "Japanese"},
        price_range: {range: '¥0~999'},
        user: {id: 0, email: "danny", name: "Danny"}
      }),
      deleteRestaurant: expect.createSpy(),
      currentUser: {id: 0, name: 'Danny'}
    }
    const component = shallow(<RestaurantDetailComponent {...props} />)

    component.find(".delete-button").simulate("click")

    expect(props.deleteRestaurant).toHaveBeenCalled()
  })

  it('does not show delete button if restaurant is not owned by current_user', () => {
    let props = {
      restaurant: fromJS({
        id: 0,
        name: 'Afuri',
        cuisine: {name: "Japanese"},
        price_range: {range: '¥0~999'},
        user: {id: 0, email: "danny", name: "Danny"}
      }),
      currentUser: {id: 1, name: 'Robert'}
    }
    const component = shallow(<RestaurantDetailComponent {...props} />)

    expect(component.find(".delete-button").length).toEqual(0)
  })

  it('shows no images if there are no photo urls', () => {
    let props = {
      restaurant: fromJS({
        photo_urls: null,
        cuisine: {},
        price_range: {},
        user: {id: 0, email: "danny", name: "Danny"}
      }),
      currentUser: {id: 0, name: 'Danny'}
    }
    const component = shallow(<RestaurantDetailComponent {...props} />)
    expect(component.find('img').length).toEqual(0)
  })

  it('displays the remove like button when retaurant has been liked', () => {
    let props = {
      restaurant: fromJS({
        liked: true,
        price_range: {},
        cuisine: {},
        user: {id: 0, email: "danny", name: "Danny"}
      }),
      currentUser: {id: 0, name: 'Danny'},
      like: () => {},
      removeLike: () => {}
    }
    const component = shallow(<RestaurantDetailComponent {...props} />)
    expect(component.contains(<button onClick={props.removeLike}>remove like</button>)).toBe(true)
    expect(component.contains(<button onClick={props.like}>like</button>)).toBe(false)
  })

  it('displays likes pluralized correctly', () => {
    let propsNoLikes = {
      restaurant: fromJS({
        num_likes: 0,
        price_range: {},
        cuisine: {},
        user: {id: 0, email: "danny", name: "Danny"}
      }),
      currentUser: {id: 0, name: 'Danny'}
    }
    expect(shallow(<RestaurantDetailComponent {...propsNoLikes} />)
      .contains(<span className="num-likes">0 likes</span>)
    ).toBe(true)


    let propsOneLike = {
      restaurant: fromJS({
        num_likes: 1,
        price_range: {},
        cuisine: {},
        user: {id: 0, email: "danny", name: "Danny"}
      }),
      currentUser: {id: 0, name: 'Danny'}
    }

    expect(shallow(<RestaurantDetailComponent {...propsOneLike} />)
      .contains(<span className="num-likes">1 like</span>)
    ).toBe(true)

    let propsTwoLikes = {
      restaurant: fromJS({
        num_likes: 2,
        price_range: {},
        cuisine: {},
        user: {id: 0, email: "danny", name: "Danny"}
      }),
      currentUser: {id: 0, name: 'Danny'}
    }

    expect(shallow(<RestaurantDetailComponent {...propsTwoLikes} />)
      .contains(<span className="num-likes">2 likes</span>)
    ).toBe(true)
  })

  it('fetches the comments', () => {
    let props = {
      fetchComments: expect.createSpy(),
      fetchRestaurant: expect.createSpy()
    }
    expect(props.fetchComments.calls.length).toBe(0)
    mount(<RestaurantDetailComponent {...props} />)
    expect(props.fetchComments.calls.length).toBe(1)
  })

  it('fetches the restaurant if there is no restaurant available in props', () => {
    let props = {
      fetchComments: expect.createSpy(),
      fetchRestaurant: expect.createSpy()
    }
    expect(props.fetchRestaurant.calls.length).toBe(0)
    mount(<RestaurantDetailComponent {...props} />)
    expect(props.fetchRestaurant.calls.length).toBe(1)
  })

  it('does not fetch the restaurant if there is one available in props', () => {
    let props = {
      fetchComments: expect.createSpy(),
      fetchRestaurant: expect.createSpy(),
      restaurant: fromJS({
        id: 1,
        name: 'Afuri',
        price_range: {},
        cuisine: {},
        user: {id: 0, email: "danny", name: "Danny"}
      }),
      currentUser: {id: 0, name: 'Danny'}
    }
    expect(props.fetchRestaurant.calls.length).toBe(0)
    mount(<RestaurantDetailComponent {...props} />)
    expect(props.fetchRestaurant.calls.length).toBe(0)
  })
})
