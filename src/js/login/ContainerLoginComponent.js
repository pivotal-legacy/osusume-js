import { connect } from 'react-redux'
import LoginComponent from './LoginComponent'
import * as actions from '../actions/Actions'

export const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => {
      dispatch(actions.login(email, password))
    }
  }
}

const ContainerLoginComponent = connect(
  null,
  mapDispatchToProps
)(LoginComponent)

export default ContainerLoginComponent
