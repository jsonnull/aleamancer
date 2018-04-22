// @flow
import * as types from 'frontend/actions/types'
import type { Action } from 'frontend/actions/types'

export type UIState = {
  initialAuthFinished: boolean,
  appIsLoading: boolean,
  userIsLoggedIn: boolean,
  showSettings: boolean
}

const initialState = {
  initialAuthFinished: false,
  appIsLoading: true,
  userIsLoggedIn: false,
  showSettings: false
}

export default function reducer(state: UIState = initialState, action: Action) {
  switch (action.type) {
    case types.INITIAL_AUTH_FINISHED:
      return {
        ...state,
        initialAuthFinished: true
      }
    case types.APP_FINISHED_LOADING:
      return {
        ...state,
        appIsLoading: false
      }
    case types.USER_LOGGED_IN:
      return {
        ...state,
        userIsLoggedIn: true
      }
    case types.USER_LOGGED_OUT:
      return {
        ...state,
        userIsLoggedIn: false
      }
    case types.SHOW_SETTINGS:
      return {
        ...state,
        showSettings: true
      }
    case types.HIDE_SETTINGS:
      return {
        ...state,
        showSettings: false
      }
    default:
      return state
  }
}
