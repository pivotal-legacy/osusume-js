import React from 'react'
import { Input } from 'pui-react-inputs'

export default class CommentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  onChange(e) {
    this.setState({comment: e.target.value})
  }
  onSubmit(e) {
    e.preventDefault(e)
    this.props.createComment(this.state.comment)
    this.setState({comment: ''})
  }
  render() {
    return (
      <form className="comment-form" onSubmit={this.onSubmit}>
        <Input type="text" placeholder="Say something nice..." onChange={this.onChange} value={this.state.comment}/>
      </form>
    )
  }
}
