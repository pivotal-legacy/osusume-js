import React from 'react'
import { Link } from 'react-router'
import { getUserName } from '../Session'

export default function MyPageComponent(props) {
  return (
    <div>
      <Link to="/"><button>restaurants</button></Link>
      <h1>my page</h1>
      <div>
        <span>{getUserName()}</span>
        <button className='logout' onClick={props.logout}>logout</button>
      </div>
    </div>
  )
}
