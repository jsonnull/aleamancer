// @flow
import * as types from 'frontend/actions/types'
import type { Action } from 'frontend/actions/types'

export type CurrentUserState = {
  id: null | string,
  email: string,
  displayName: string,
  photoURL: ?string
}

export const initialState = {
  id: null,
  email: 'anonymous',
  displayName: 'anonymous',
  photoURL: undefined
}

export default function reducer(
  state: CurrentUserState = initialState,
  action: Action
) {
  switch (action.type) {
    case types.USER_LOGGED_IN:
      return { ...state, id: action.id, email: action.email }
    case types.PERFORM_USER_LOGOUT:
      return { ...initialState }
    case types.UPDATE_USER_PROFILE:
    case types.HYDRATE_USER_PROFILE:
      return { ...state, ...action.user }
    case types.CHANGE_DISPLAY_NAME:
      return { ...state, displayName: action.name }
    default:
      return state
  }
}
