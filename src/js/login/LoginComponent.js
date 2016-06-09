import React from 'react';

export default class LoginComponent extends React.Component {
  render() {
    let email, password

    return (
      <div>
        <h1>login</h1>
        <label>email</label>
        <input className="email" ref={node => {email = node}}/>
        <label>password</label>
        <input className="password" ref={node => {password = node}}/>
        <button onClick={_ => {this.props.login(email.value, password.value)}}>
          login
        </button>
      </div>
    )
  }
}
