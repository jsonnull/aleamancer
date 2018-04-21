// @flow
import React from 'react'
import { mount } from 'enzyme'
import App, { setupStore } from '../../appContainer'
import { performUserLogin } from 'frontend/actions'
import { APP_FINISHED_LOADING } from 'frontend/actions/types'
import loginFunction from 'frontend/firebase/login'
import Login from 'frontend/pages/Login'

describe('Login container', () => {
  const store = setupStore()
  store.dispatch({ type: APP_FINISHED_LOADING })
  const wrapper = mount(
    <App store={store}>
      <Login />
    </App>
  )

  it('should perform login action', () => {
    const email = 'email@example.com'
    const password = 'password'
    const loginAction = performUserLogin(email, password)
    wrapper
      .find('input[type="text"]')
      .simulate('change', { target: { value: email } })
    wrapper
      .find('input[type="password"]')
      .simulate('change', { target: { value: password } })
    wrapper.find('button').simulate('click')
    // $FlowJestError
    expect(loginFunction.calledWith(loginAction)).toBe(true)
  })
})
