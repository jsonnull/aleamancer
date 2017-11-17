// @flow
import { take, put, call, select } from 'redux-saga/effects'
import { changeDisplayName } from 'actions'
import { CHANGE_DISPLAY_NAME } from 'actions/types'
import type { UserProfileState } from 'reducers/user/profile'

export default function* saveUserProfile(
  getCurrentUserEmail: () => string,
  saveProfile: Function
): Generator<*, *, *> {
  while (true) {
    yield take(CHANGE_DISPLAY_NAME)
    const profile = yield select(state => state.user.profile)
    if (profile.displayName === '') {
      const email = yield call(getCurrentUserEmail)
      yield put(changeDisplayName(email))
    } else {
      const profileToSave = {
        displayName: profile.displayName
      }
      yield call(saveProfile, profileToSave)
    }
  }
}
