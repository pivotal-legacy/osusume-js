import React from 'react'

export default function MyPageComponent(props) {
  return (
    <div>
      <h1>my page</h1>
      <div>{localStorage.getItem('userName')}</div>
    </div>
  )
}
