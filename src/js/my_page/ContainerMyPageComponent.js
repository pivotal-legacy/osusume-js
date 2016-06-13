import {connect} from 'react-redux'
import * as actions from '../actions/AuthenticationActions'
import MyPageComponent from './MyPageComponent'

export const mapStateToProps = () => {return {}}

export const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(actions.logout())
    }
  }
}

const ContainerMyPageComponent = connect (mapStateToProps, mapDispatchToProps)(MyPageComponent)

export default ContainerMyPageComponent
