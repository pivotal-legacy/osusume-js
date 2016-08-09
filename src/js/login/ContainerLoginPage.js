import { connect } from 'react-redux'
import LoginPage from './LoginPage'
import * as actions from '../actions/AuthenticationActions'

export const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => {
      dispatch(actions.login(email, password))
    }
  }
}

const ContainerLoginPage = connect(
  null,
  mapDispatchToProps
)(LoginPage)

export default ContainerLoginPage
