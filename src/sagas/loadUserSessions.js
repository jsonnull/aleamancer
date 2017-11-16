// @flow
import firebase from '@firebase/app'
import '@firebase/database'
import '@firebase/auth'
import { call, put, takeEvery } from 'redux-saga/effects'
import { hydrateUserData } from 'actions'
import { USER_LOGGED_IN } from 'actions/types'
import type { UserDataState } from 'reducers/user/data'

type GetUserDataFunction = () => Promise<?UserDataState>

export function* loadSessions(
  getCurrentUserData: GetUserDataFunction
): Generator<*, *, *> {
  const data: ?UserDataState = yield call(getCurrentUserData)

  if (data) {
    yield put(hydrateUserData(data))
  }
}

export default function* loadSessionWatcher(
  getCurrentUserData: GetUserDataFunction
): Generator<*, *, *> {
  // Wait for user auth to complete
  yield takeEvery(USER_LOGGED_IN, loadSessions, getCurrentUserData)
}
