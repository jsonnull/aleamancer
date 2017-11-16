// @flow
import { take, call, put } from 'redux-saga/effects'
import { hydratePreferences } from 'actions'
import { USER_LOGGED_IN, APP_FINISHED_LOADING } from 'actions/types'
import type { UserPreferencesState } from 'reducers/user/preferences'

type GetPreferencesFunction = () => Promise<UserPreferencesState>

export default function* loadUserPreferences(
  getUserPreferences: GetPreferencesFunction
): Generator<*, *, *> {
  while (true) {
    yield take(USER_LOGGED_IN)
    const prefs = yield call(getUserPreferences)
    yield put(hydratePreferences(prefs))
    yield put({ type: APP_FINISHED_LOADING })
  }
}
