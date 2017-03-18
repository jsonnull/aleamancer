/* @flow */
import type { Action } from '../actions/types'

export type UIState = {
  appIsLoading: boolean,
  userIsLoggedIn: boolean
}

const initialState = {
  appIsLoading: true,
  userIsLoggedIn: false
}

export default function reducer (state: UIState = initialState, action: Action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, appIsLoading: action.appIsLoading }
    case 'SET_USER_LOGGED_IN':
      return { ...state, userIsLoggedIn: action.userIsLoggedIn }
    default:
      return state
  }
}
