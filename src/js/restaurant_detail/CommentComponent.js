import React from 'react'


export default function CommentComponent(props) {
  let commentedDate = (new Date(props.comment.get('created_at'))).toLocaleDateString()
  return (
    <div className="comment">
      <div>{props.comment.get('comment')}</div>
      <div>{commentedDate}</div>
      <div>{props.comment.get('user').get('name')}</div>
    </div>
  )
}
