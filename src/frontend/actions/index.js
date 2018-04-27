// @flow
import type { Message, Tab, ThemeName, UserProfile } from 'common/types'
import type { PreferencesState } from 'frontend/reducers/preferences'
import type { Action } from 'frontend/actions/types'

/*
 * Messages
 */
export const sendMessage = (text: string): Action => {
  return { type: 'SEND_MESSAGE', text }
}
export const receiveMessage = (message: Message): Action => {
  return { type: 'RECEIVE_MESSAGE', message }
}

/*
 * User
 */
export const performUserLogin = (email: string, password: string): Action => ({
  type: 'PERFORM_USER_LOGIN',
  email,
  password
})

export const userLoggedIn = (id: string, email: string): Action => ({
  type: 'USER_LOGGED_IN',
  id,
  email
})

/*
 * User Profile
 */
export const changeDisplayName = (name: string): Action => ({
  type: 'CHANGE_DISPLAY_NAME',
  name
})

export const hydrateUserProfile = (user: UserProfile): Action => ({
  type: 'HYDRATE_USER_PROFILE',
  user
})

export const updateUserProfile = (user: UserProfile): Action => ({
  type: 'UPDATE_USER_PROFILE',
  user
})

/*
 * User Preferences
 */
export const hydratePreferences = (prefs: PreferencesState): Action => ({
  type: 'HYDRATE_PREFERENCES',
  prefs
})

export const changeTheme = (theme: ThemeName): Action => ({
  type: 'CHANGE_THEME',
  theme
})

/*
 * Session
 */

export const switchToSession = (sessionId: string): Action => ({
  type: 'SWITCH_TO_SESSION',
  sessionId
})

/*
 * Sidebar
 */
export const changeSidebarTab = (tab: Tab): Action => ({
  type: 'CHANGE_SIDEBAR_TAB',
  tab
})
