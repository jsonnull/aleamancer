// @flow
import type { Saga } from 'redux-saga'
import slug from 'slugg'
import { put, select, takeEvery } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import sessionIdSelector from 'frontend/selectors/sessionId'
import { changeSidebarTab } from 'frontend/actions'
import { SWITCH_TO_SESSION } from 'frontend/actions/types'
import type { Action } from 'frontend/actions/types'

export function* switchToSession(action: Action): Saga<void> {
  if (action.type !== SWITCH_TO_SESSION) {
    return
  }

  const sessionId = action.sessionId
  const currentSessionId = yield select(sessionIdSelector)

  if (sessionId !== currentSessionId) {
    // Get session name
    const sessions = yield select(state => state.sessions)

    // FIXME: Is there some way to remove these if statements?
    const session = sessions.find(el => el.id === sessionId)
    if (session) {
      const meta = session.meta
      if (meta) {
        const name = slug(meta.name)
        yield put(push(`/g/${name}/${sessionId}`))
        yield put(changeSidebarTab('Session'))
      }
    }
  }
}

export default function* switchSessions(): Saga<void> {
  yield takeEvery(SWITCH_TO_SESSION, switchToSession)
}
