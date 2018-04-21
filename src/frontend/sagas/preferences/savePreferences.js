// @flow
import type { Saga } from 'redux-saga'
import { call, select, take } from 'redux-saga/effects'
import { CHANGE_THEME, TOGGLE_CHAT_PIN } from 'frontend/actions/types'
import savePreferences from 'frontend/firebase/savePreferences'

export default function* saveUserPreferences(): Saga<void> {
  while (true) {
    yield take([CHANGE_THEME, TOGGLE_CHAT_PIN])
    const preferences = yield select(state => state.preferences)
    yield call(savePreferences, preferences)
  }
}
