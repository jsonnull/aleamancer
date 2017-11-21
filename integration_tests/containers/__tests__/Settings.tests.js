// @flow
import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { ConnectedRouter, push } from 'react-router-redux'
import { hydrateUserData } from '../../../src/actions'
import {
  APP_FINISHED_LOADING,
  USER_LOGGED_IN
} from '../../../src/actions/types'
import setupStore, { history } from '../../setupStore'
import { logoutFunction } from '../../setupSagas'
import Settings from '../../../src/containers/Settings'

describe('Settings container', () => {
  const store = setupStore()
  store.dispatch({ type: APP_FINISHED_LOADING })
  const wrapper = mount(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Settings />
      </ConnectedRouter>
    </Provider>
  )

  it('show the user display name', () => {
    expect(wrapper.text()).toContain('anonymous')
  })

  it('should allow the user to change theme', () => {
    expect(store.getState().user.preferences.theme).toEqual('light')
    const darkButton = wrapper.find('button').at(1)
    expect(darkButton.text()).toContain('Dark')
    darkButton.simulate('click')
    expect(store.getState().user.preferences.theme).toEqual('dark')
  })

  it('should allow the user to log out', () => {
    store.dispatch({ type: USER_LOGGED_IN })
    expect(store.getState().ui.userIsLoggedIn).toBe(true)
    const logoutButton = wrapper.find('button').last()
    expect(logoutButton.text()).toContain('Logout')
    logoutButton.simulate('click')
    expect(store.getState().ui.userIsLoggedIn).toBe(false)
    expect(logoutFunction.called).toBe(true)
  })
})
