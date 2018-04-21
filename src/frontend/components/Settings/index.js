// @flow
import React from 'react'
import Modal from '../Modal'
import type { Theme } from 'frontend/styles/themes'
import type { DispatchProps, StateProps } from 'frontend/containers/Settings'
import Logout from './Logout'
import Name from './Name'
import ThemeSwitcher from './ThemeSwitcher'

type Props = {
  theme: Theme
} & StateProps &
  DispatchProps

const Settings = (props: Props) => {
  const {
    showSettings,
    displayName,
    changeDisplayName,
    theme,
    changeTheme,
    logout,
    dismissSettings
  } = props

  return (
    <Modal show={showSettings} dismiss={dismissSettings}>
      {() => (
        <div>
          <Name name={displayName} onChange={changeDisplayName} />

          <ThemeSwitcher currentTheme={theme.name} changeTheme={changeTheme} />

          <Logout logout={logout} />
        </div>
      )}
    </Modal>
  )
}

export default Settings
