// @flow
import type { Saga } from 'redux-saga'
import { call, put, takeEvery } from 'redux-saga/effects'
import { hydrateUserData } from 'actions'
import { USER_LOGGED_IN } from 'actions/types'
import type { UserDataState } from 'reducers/user/data'
import getCurrentUserData from 'firebase/getCurrentUserData'

export function* loadSessions(): Saga<void> {
  const data: ?UserDataState = yield call(getCurrentUserData)

  if (data) {
    yield put(hydrateUserData(data))
  }
}

export default function* loadSessionWatcher(): Saga<void> {
  // Wait for user auth to complete
  yield takeEvery(USER_LOGGED_IN, loadSessions)
}
