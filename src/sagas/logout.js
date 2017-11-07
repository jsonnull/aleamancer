// @flow
import { PERFORM_USER_LOGOUT, USER_LOGGED_OUT } from 'actions/types'
import { take, call, put } from 'redux-saga/effects'

export default function* logout(logoutFunction: Function): Generator<*, *, *> {
  while (true) {
    yield take(PERFORM_USER_LOGOUT)
    yield call(logoutFunction)
    yield put({ type: USER_LOGGED_OUT })
  }
}
