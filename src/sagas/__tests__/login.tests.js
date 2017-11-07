// @flow
import setupStore from './setupStore'
import { loginFunction } from './setupSagas'
import { performUserLogin } from 'actions'
import { PERFORM_USER_LOGIN } from 'actions/types'

describe('login saga', () => {
  const store = setupStore()

  const loginAction = performUserLogin('test@email.com', 'password')

  it('should respond to PERFORM_USER_LOGIN instruction', () => {
    store.dispatch(loginAction)
    expect(loginFunction.calledWith(loginAction)).toBe(true)
  })
})
