// @flow
import { take, call, put, select } from 'redux-saga/effects'
import {
  APP_FINISHED_LOADING,
  PERFORM_USER_LOGIN,
  PERFORM_USER_LOGOUT,
  USER_LOGGED_IN,
  USER_LOGGED_OUT
} from 'actions/types'

export default function* login(
  loginFunction: Function,
  logoutFunction: Function
): Generator<*, *, *> {
  yield take(APP_FINISHED_LOADING)
  let userIsLoggedIn = yield select(state => state.ui.userIsLoggedIn)

  while (true) {
    const action = yield take([
      USER_LOGGED_IN,
      PERFORM_USER_LOGIN,
      PERFORM_USER_LOGOUT
    ])
    if (action.type == PERFORM_USER_LOGIN) {
      if (!userIsLoggedIn) {
        yield call(loginFunction, action)
      }
    } else if (action.type == USER_LOGGED_IN) {
      userIsLoggedIn = true
    } else if (action.type == PERFORM_USER_LOGOUT) {
      yield call(logoutFunction)
      yield put({ type: USER_LOGGED_OUT })
      userIsLoggedIn = false
    }
  }
}
