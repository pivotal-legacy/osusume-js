import React from 'react'

export default function CommentComponent(props) {
  let commentedDate = (new Date(props.comment.created_at)).toLocaleDateString()
  return (
    <div className="comment">
      <div>{props.comment.comment}</div>
      <div>{commentedDate}</div>
      <div>{props.comment.user.name}</div>
    </div>
  )
}
