// @flow
import * as types from 'frontend/actions/types'
import type { Action } from 'frontend/actions/types'
import type { SessionInfo } from 'common/types'

export type SessionsState = Array<SessionInfo>

const initialState = []

export default function reducer(
  state: SessionsState = initialState,
  action: Action
) {
  switch (action.type) {
    case types.HYDRATE_SESSIONS_LIST:
      return [...action.sessions]
    case types.HYDRATE_SESSION_META:
      const { meta, sessionId } = action
      return state.map(session => {
        if (session.id === sessionId) {
          return { ...session, meta }
        }
        return session
      })
    default:
      return state
  }
}
