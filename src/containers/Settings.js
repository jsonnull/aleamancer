// @flow
import React from 'react'
import { connect } from 'react-redux'
import Settings from 'components/Settings'
import { changeTheme, changeDisplayName } from 'actions'
import * as themes from 'styles/themes'
import type { ThemeName } from 'types'
import type { Theme } from 'styles/themes'
import type { State } from 'store'

export type StateProps = {
  theme: Theme,
  displayName: string,
  showSettings: boolean
}
const mapStateToProps = (state: State): StateProps => ({
  theme: themes[state.user.preferences.theme],
  displayName: state.user.profile.displayName,
  showSettings: state.ui.showSettings
})

export type DispatchProps = {
  changeTheme: (theme: ThemeName) => void,
  changeDisplayName: (name: string) => void,
  logout: Function,
  dismissSettings: Function
}
const mapDispatchToProps = (dispatch: Function): DispatchProps => ({
  changeTheme: (theme: ThemeName) => dispatch(changeTheme(theme)),
  changeDisplayName: (name: string) => dispatch(changeDisplayName(name)),
  logout: () => dispatch({ type: 'PERFORM_USER_LOGOUT' }),
  dismissSettings: () => dispatch({ type: 'HIDE_SETTINGS' })
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
