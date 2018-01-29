// @flow
import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { ConnectedRouter } from 'react-router-redux'
import { performUserLogin } from '../../../src/actions'
import { APP_FINISHED_LOADING } from '../../../src/actions/types'
import setupStore, { history } from '../../setupStore'
import loginFunction from 'firebase/login'
import Login from '../../../src/containers/Login'

describe('Login container', () => {
  const store = setupStore()
  store.dispatch({ type: APP_FINISHED_LOADING })
  const wrapper = mount(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Login />
      </ConnectedRouter>
    </Provider>
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
