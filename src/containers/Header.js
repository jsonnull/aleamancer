// @flow
import { connect } from 'react-redux'
import Header from '../components/Header'
import { SHOW_SETTINGS } from '../actions/types'
import type { State } from '../store'
import displayNameSelector from '../selectors/displayName'

type StateProps = {
  username: string | null,
  userIsLoggedIn: boolean
}
const mapStateToProps = (state: State): StateProps => ({
  username: displayNameSelector(state),
  userIsLoggedIn: state.currentUser.id !== null
})

type DispatchProps = {
  showSettings: Function
}
const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
  showSettings: () => dispatch({ type: SHOW_SETTINGS })
})

const mergeProps = (stateProps, dispatchProps) => {
  return {
    ...dispatchProps,
    username: stateProps.userIsLoggedIn ? stateProps.username : null
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Header)
