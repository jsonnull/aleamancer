// @flow
import { all, select, call, put, takeLatest } from 'redux-saga/effects'
import { hydrateSessionMeta } from 'actions'
import { HYDRATE_USER_DATA } from 'actions/types'

type GetSessionMeta = (sessionId: string) => Promise<Object>

export function* loadSessionMeta(
  getSessionMeta: GetSessionMeta,
  sessionId: string
): Generator<*, *, *> {
  const meta = yield call(getSessionMeta, sessionId)
  yield put(hydrateSessionMeta(sessionId, meta))
}

export function* loadAllMeta(
  getSessionMeta: GetSessionMeta
): Generator<*, *, *> {
  const sessions = yield select(state => state.user.data.sessions)

  yield all(
    sessions.map(session => call(loadSessionMeta, getSessionMeta, session.id))
  )
}

export default function* loadMeta(
  getSessionMeta: GetSessionMeta
): Generator<*, *, *> {
  yield takeLatest(HYDRATE_USER_DATA, loadAllMeta, getSessionMeta)
}
