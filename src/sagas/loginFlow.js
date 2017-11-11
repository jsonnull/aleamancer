// @flow
import { take, call, put } from 'redux-saga/effects'
import {
  PERFORM_USER_LOGIN,
  PERFORM_USER_LOGOUT,
  USER_LOGGED_OUT
} from 'actions/types'

export default function* login(
  loginFunction: Function,
  logoutFunction: Function
): Generator<*, *, *> {
  while (true) {
    const loginAction = yield take(PERFORM_USER_LOGIN)
    yield call(loginFunction, loginAction)
    yield take(PERFORM_USER_LOGOUT)
    yield call(logoutFunction)
    yield put({ type: USER_LOGGED_OUT })
  }
}
