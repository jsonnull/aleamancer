// @flow
import type { Action } from './types'
import type { SessionMeta, Message, ThemeName, Tab } from 'types'
import type { UserProfileState } from 'reducers/user/profile'
import type { UserPreferencesState } from 'reducers/user/preferences'
import type { UserDataState } from 'reducers/user/data'
import type { SessionState } from 'reducers/session'

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

/*
 * User Profile
 */
export const changeDisplayName = (name: string): Action => ({
  type: 'CHANGE_DISPLAY_NAME',
  name
})

export const hydrateUserProfile = (user: UserProfileState): Action => ({
  type: 'HYDRATE_USER_PROFILE',
  user
})

export const updateUserProfile = (user: UserProfileState): Action => ({
  type: 'UPDATE_USER_PROFILE',
  user
})

/*
 * User Preferences
 */
export const hydratePreferences = (prefs: UserPreferencesState): Action => ({
  type: 'HYDRATE_PREFERENCES',
  prefs
})

export const changeTheme = (theme: ThemeName): Action => ({
  type: 'CHANGE_THEME',
  theme
})

/*
 * User Data
 */
export const hydrateUserData = (user: UserDataState): Action => ({
  type: 'HYDRATE_USER_DATA',
  user
})

export const hydrateSessionMeta = (
  sessionId: string,
  meta: SessionMeta
): Action => ({
  type: 'HYDRATE_SESSION_META',
  sessionId,
  meta
})

/*
 * Session
 */
export const hydrateSession = (session: SessionState): Action => ({
  type: 'HYDRATE_SESSION',
  session
})

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
