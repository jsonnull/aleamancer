// @flow
import * as types from 'actions/types'
import type { Action } from 'actions/types'
import type { SessionInfo } from 'types'

export type UserDataState = {
  sessions: Array<SessionInfo>
}

const initialState = {
  sessions: []
}

export default function reducer(
  state: UserDataState = initialState,
  action: Action
) {
  switch (action.type) {
    case types.HYDRATE_USER_DATA:
      return { ...state, ...action.user }
    case types.HYDRATE_SESSION_META:
      const { meta, sessionId } = action
      return {
        ...state,
        sessions: state.sessions.map(session => {
          if (session.id === sessionId) {
            return { ...session, meta }
          }
          return session
        })
      }
    default:
      return state
  }
}
