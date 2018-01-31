// @flow
import type { Saga } from 'redux-saga'
import { take, put, call, select } from 'redux-saga/effects'
import { changeDisplayName } from 'actions'
import { CHANGE_DISPLAY_NAME } from 'actions/types'
import getCurrentUserEmail from 'firebase/getCurrentUserEmail'
import saveProfile from 'firebase/saveProfile'
import type { UserProfile } from 'types'

export default function* saveUserProfile(): Saga<void> {
  while (true) {
    const action = yield take(CHANGE_DISPLAY_NAME)
    const profile = yield select(state => state.user.profile)
    if (profile.displayName === '') {
      const email = yield call(getCurrentUserEmail)
      yield put(changeDisplayName(action.id, email))
    } else {
      const profileToSave: UserProfile = {
        ...profile,
        displayName: profile.displayName
      }
      yield call(saveProfile, profileToSave)
    }
  }
}
