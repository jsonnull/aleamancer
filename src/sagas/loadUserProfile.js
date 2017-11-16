// @flow
import { take, call, put } from 'redux-saga/effects'
import { hydrateUserProfile } from 'actions'
import { USER_LOGGED_IN } from 'actions/types'
import type { UserProfileState } from 'reducers/user/profile'

type GetUserProfile = () => UserProfileState

export default function* loadUserProfile(
  getUserProfile: GetUserProfile
): Generator<*, *, *> {
  // Wait for user auth to complete
  while (true) {
    yield take(USER_LOGGED_IN)
    const user = yield call(getUserProfile)
    yield put(hydrateUserProfile(user))
  }
}
