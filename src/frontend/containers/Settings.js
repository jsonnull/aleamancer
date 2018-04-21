// @flow
import { connect } from 'react-redux'
import Settings from 'frontend/components/Settings'
import { changeDisplayName, changeTheme } from 'frontend/actions'
import { HIDE_SETTINGS, PERFORM_USER_LOGOUT } from 'frontend/actions/types'
import displayNameSelector from 'frontend/selectors/displayName'
import * as themes from 'frontend/styles/themes'
import type { ThemeName } from 'common/types'
import type { Theme } from 'frontend/styles/themes'
import type { State } from 'frontend/store'

export type StateProps = {
  theme: Theme,
  displayName: string,
  showSettings: boolean
}
const mapStateToProps = (state: State): StateProps => ({
  theme: themes[state.preferences.theme],
  displayName: displayNameSelector(state),
  showSettings: state.ui.showSettings
})

export type DispatchProps = {
  changeTheme: (theme: ThemeName) => void,
  changeDisplayName: (name: string) => void,
  logout: Function,
  dismissSettings: Function
}
const mapDispatchToProps = (dispatch: Function) => ({
  changeTheme: (theme: ThemeName) => dispatch(changeTheme(theme)),
  changeDisplayName: (name: string) => dispatch(changeDisplayName(name)),
  logout: () => dispatch({ type: PERFORM_USER_LOGOUT }),
  dismissSettings: () => dispatch({ type: HIDE_SETTINGS })
})

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
