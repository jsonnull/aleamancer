// @flow
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { ConnectedRouter } from 'react-router-redux'
import { light } from 'styles/themes'
import { userLoggedIn, hydrateUserProfile } from '../../../src/actions'
import {
  APP_FINISHED_LOADING,
  USER_LOGGED_IN
} from '../../../src/actions/types'
import setupStore, { history } from '../../setupStore'
import logoutFunction from 'firebase/logout'
import Settings from '../../../src/containers/Settings'

describe('Settings container', () => {
  const store = setupStore()
  // Mimic user login and basic details
  store.dispatch(userLoggedIn('testUserId'))
  store.dispatch(
    hydrateUserProfile('testUserId', {
      displayName: 'anonymous',
      photoURL: null
    })
  )
  store.dispatch({ type: APP_FINISHED_LOADING })

  const wrapper = mount(
    <ThemeProvider theme={light}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Settings />
        </ConnectedRouter>
      </Provider>
    </ThemeProvider>
  )

  it('show the user display name', () => {
    expect(wrapper.text()).toContain('anonymous')
  })

  it('should allow the user to change theme', () => {
    expect(store.getState().preferences.theme).toEqual('light')
    const darkButton = wrapper.find('button').at(1)
    expect(darkButton.text()).toContain('Dark')
    darkButton.simulate('click')
    expect(store.getState().preferences.theme).toEqual('dark')
  })

  it('should allow the user to log out', () => {
    store.dispatch({ type: USER_LOGGED_IN })
    expect(store.getState().ui.userIsLoggedIn).toBe(true)
    const logoutButton = wrapper.find('button').last()
    expect(logoutButton.text()).toContain('Logout')
    logoutButton.simulate('click')
    expect(store.getState().ui.userIsLoggedIn).toBe(false)
    // $FlowJestError
    expect(logoutFunction.called).toBe(true)
  })
})
