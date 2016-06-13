import React from 'react'
import { Link } from 'react-router'

export default function MyPageComponent(props) {
  return (
    <div>
      <Link to="/"><button>restaurants</button></Link>
      <h1>my page</h1>
      <div>{localStorage.getItem('userName')}</div>
    </div>
  )
}
