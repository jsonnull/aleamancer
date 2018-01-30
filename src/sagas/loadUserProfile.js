// @flow
import type { Saga } from 'redux-saga'
import { take, call, put } from 'redux-saga/effects'
import { hydrateUserProfile } from 'actions'
import { USER_LOGGED_IN } from 'actions/types'
import getUserProfile from 'firebase/getCurrentUserProfile'
import type { UserProfile } from 'types'
import type { Action } from 'actions/types'

export default function* loadUserProfile(): Saga<void> {
  // Wait for user auth to complete
  while (true) {
    const action: Action = yield take(USER_LOGGED_IN)
    if (action.type === USER_LOGGED_IN) {
      const user: UserProfile = yield call(getUserProfile)
      yield put(hydrateUserProfile(action.id, user))
    }
  }
}
