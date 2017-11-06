// @flow
import * as actions from '../index'
import type { UserProfileState } from 'reducers/user/profile'
import type { UserPreferencesState } from 'reducers/user/preferences'
import type { UserDataState } from 'reducers/user/data'

describe('actions', () => {
  it('should create an action to send a message', () => {
    const text = 'message text'
    expect(actions.sendMessage(text)).toEqual({
      type: 'SEND_MESSAGE',
      text
    })
  })

  it('should create an action to receive a message', () => {
    const message = {
      key: 'key',
      from: 'user',
      text: 'message text',
      result: null,
      timestamp: 0
    }

    expect(actions.receiveMessage(message)).toEqual({
      type: 'RECEIVE_MESSAGE',
      message
    })
  })

  it("should create an action to fill in the user's profile", () => {
    const user: UserProfileState = {
      displayName: 'testing',
      photoURL: null
    }

    expect(actions.hydrateUserProfile(user)).toEqual({
      type: 'HYDRATE_USER_PROFILE',
      user
    })

    expect(actions.updateUserProfile(user)).toEqual({
      type: 'UPDATE_USER_PROFILE',
      user
    })
  })

  it("should create an action to fill in the user's preferences", () => {
    const prefs: UserPreferencesState = {
      theme: 'light',
      chatPinned: false
    }

    expect(actions.hydratePreferences(prefs)).toEqual({
      type: 'HYDRATE_PREFERENCES',
      prefs
    })
  })

  it("should create an action to change the user's theme", () => {
    expect(actions.changeTheme('light')).toEqual({
      type: 'CHANGE_THEME',
      theme: 'light'
    })
  })

  it('should create an action to fill in user data', () => {
    const user: UserDataState = {
      currentSession: null,
      userSessions: {}
    }

    expect(actions.hydrateUserData(user)).toEqual({
      type: 'HYDRATE_USER_DATA',
      user
    })
  })

  it('should create an action to populate session meta', () => {
    expect(actions.hydrateSessionMeta('id', { name: 'test' })).toEqual({
      type: 'HYDRATE_SESSION_META',
      userSessionId: 'id',
      meta: {
        name: 'test'
      }
    })
  })

  it('should create an action to populate session data', () => {
    expect(actions.hydrateSession({ mydata: 'data' })).toEqual({
      type: 'HYDRATE_SESSION',
      session: { mydata: 'data' }
    })
  })

  it('should create an action to change the current tab on the sidebar', () => {
    expect(actions.changeSidebarTab('Session')).toEqual({
      type: 'CHANGE_SIDEBAR_TAB',
      tab: 'Session'
    })
  })
})
