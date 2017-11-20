// @flow
import React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Header from 'components/Header'
import { SHOW_SETTINGS } from 'actions/types'
import type { State } from 'store'

type StateProps = {
  username: string
}
const mapStateToProps = (state: State): StateProps => ({
  username: state.user.profile.displayName
})

type DispatchProps = {
  goHome: Function,
  showSettings: Function
}
const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
  goHome: () => dispatch(push('/')),
  showSettings: () => dispatch({ type: SHOW_SETTINGS })
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
