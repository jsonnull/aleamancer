// @flow
import { take, call } from 'redux-saga/effects'
import { PERFORM_USER_LOGIN } from 'actions/types'

export default function* login(loginFunction: Function): Generator<*, *, *> {
  while (true) {
    const action = yield take(PERFORM_USER_LOGIN)
    yield call(loginFunction, action)
  }
}
