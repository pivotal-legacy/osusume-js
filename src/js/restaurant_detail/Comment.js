import React from 'react'

export default function Comment(props) {
  let commentedDate = (new Date(props.comment.created_at)).toLocaleDateString()
  return (
    <div className="comment">
      <span className="left">{props.comment.user.name}</span>
      <span className="right">{commentedDate}</span>
      <span className="center">&nbsp;</span>
      <div>{props.comment.comment}</div>
    </div>
  )
}
