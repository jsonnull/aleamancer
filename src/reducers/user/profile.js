// @flow
import * as types from 'actions/types'
import type { Action } from '../../actions/types'

export type UserProfileState = {
  displayName: string,
  photoURL: ?string
}

const initialState = {
  displayName: 'anonymous',
  photoURL: ''
}

export default function reducer(
  state: UserProfileState = initialState,
  action: Action
) {
  switch (action.type) {
    case types.UPDATE_USER_PROFILE:
    case types.HYDRATE_USER_PROFILE:
      return { ...state, ...action.user }
    case types.CHANGE_DISPLAY_NAME:
      return { ...state, displayName: action.name }
    default:
      return state
  }
}
