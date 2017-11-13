// @flow
import { all, select, call, put, takeLatest } from 'redux-saga/effects'
import { hydrateSessionMeta } from 'actions'
import { HYDRATE_USER_DATA } from 'actions/types'

type GetSessionMeta = (sessionId: string) => Promise<Object>

export function* loadSessionMeta(
  getSessionMeta: GetSessionMeta,
  userSessionId: string,
  sessionId: string
): Generator<*, *, *> {
  const meta = yield call(getSessionMeta, sessionId)
  yield put(hydrateSessionMeta(userSessionId, meta))
}

export function* loadAllMeta(
  getSessionMeta: GetSessionMeta
): Generator<*, *, *> {
  const sessions = yield select(state => state.user.data.userSessions)

  yield all(
    Object.keys(sessions).map(key =>
      call(loadSessionMeta, getSessionMeta, key, sessions[key].sessionId)
    )
  )
}

export default function* loadMeta(
  getSessionMeta: GetSessionMeta
): Generator<*, *, *> {
  yield takeLatest(HYDRATE_USER_DATA, loadAllMeta, getSessionMeta)
}
