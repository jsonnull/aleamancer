// @flow
import type { Saga } from 'redux-saga'
import { call, put, take } from 'redux-saga/effects'
import { hydrateUserProfile } from 'frontend/actions'
import { USER_LOGGED_IN } from 'frontend/actions/types'
import getUserProfile from 'frontend/firebase/getCurrentUserProfile'
import type { UserProfile } from 'common/types'
import type { Action } from 'frontend/actions/types'

export default function* loadUserProfile(): Saga<void> {
  // Wait for user auth to complete
  while (true) {
    const action: Action = yield take(USER_LOGGED_IN)
    if (action.type === USER_LOGGED_IN) {
      const user: UserProfile = yield call(getUserProfile)
      yield put(hydrateUserProfile(user))
    }
  }
}
