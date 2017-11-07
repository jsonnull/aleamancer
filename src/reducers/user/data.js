// @flow
import * as types from 'actions/types'
import type { Action } from 'actions/types'
import type { SessionInfo } from 'types'

export type UserDataState = {
  userSessions: {
    [key: string]: SessionInfo
  }
}

const initialState = {
  userSessions: {}
}

export default function reducer(
  state: UserDataState = initialState,
  action: Action
) {
  switch (action.type) {
    case types.HYDRATE_USER_DATA:
      return { ...state, ...action.user }
    case types.HYDRATE_SESSION_META:
      const { meta, userSessionId } = action
      return {
        ...state,
        userSessions: {
          ...state.userSessions,
          [userSessionId]: {
            ...state.userSessions[userSessionId],
            meta: { ...meta }
          }
        }
      }
    default:
      return state
  }
}
