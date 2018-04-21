// @flow
import type { Saga } from 'redux-saga'
import { call, put, select, take } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import performLogin from 'frontend/firebase/login'
import performLogout from 'frontend/firebase/logout'
import {
  APP_FINISHED_LOADING,
  HIDE_SETTINGS,
  PERFORM_USER_LOGIN,
  PERFORM_USER_LOGOUT,
  USER_LOGGED_IN,
  USER_LOGGED_OUT
} from 'frontend/actions/types'

export default function* login(): Saga<void> {
  // Wait for app to complete loading
  yield take(APP_FINISHED_LOADING)

  // See if user is logged in
  let userIsLoggedIn = yield select(state => state.ui.userIsLoggedIn)

  while (true) {
    const action = yield take([
      USER_LOGGED_IN,
      PERFORM_USER_LOGIN,
      PERFORM_USER_LOGOUT
    ])

    if (action.type == PERFORM_USER_LOGIN && !userIsLoggedIn) {
      yield call(performLogin, action)
    } else if (action.type == USER_LOGGED_IN) {
      userIsLoggedIn = true
    } else if (action.type == PERFORM_USER_LOGOUT) {
      yield call(performLogout)
      yield put({ type: USER_LOGGED_OUT })
      yield put({ type: HIDE_SETTINGS })
      yield put(push('/'))
      userIsLoggedIn = false
    }
  }
}
