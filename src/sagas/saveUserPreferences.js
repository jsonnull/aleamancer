// @flow
import { take, call, select } from 'redux-saga/effects'
import { CHANGE_THEME, TOGGLE_CHAT_PIN } from 'actions/types'
import type { UserPreferencesState } from 'reducers/user/preferences'

export default function* saveUserPreferences(
  savePreferences: (preferences: UserPreferencesState) => void
): Generator<*, *, *> {
  while (true) {
    yield take([CHANGE_THEME, TOGGLE_CHAT_PIN])
    const preferences = yield select(state => state.user.preferences)
    yield call(savePreferences, preferences)
  }
}
