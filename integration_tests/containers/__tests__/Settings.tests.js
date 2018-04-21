// @flow
import React from 'react'
import { mount } from 'enzyme'
import App, { setupStore } from '../../appContainer'
import { ThemeProvider } from 'styled-components'
import { light } from 'frontend/styles/themes'
import { userLoggedIn, hydrateUserProfile } from 'frontend/actions'
import { APP_FINISHED_LOADING, USER_LOGGED_IN } from 'frontend/actions/types'
import logoutFunction from 'frontend/firebase/logout'
import Settings from 'frontend/containers/Settings'

describe('Settings container', () => {
  const store = setupStore()
  // Mimic user login and basic details
  store.dispatch(userLoggedIn('testUserId', 'test@example.com'))
  store.dispatch(
    hydrateUserProfile({
      displayName: 'anonymous',
      photoURL: null
    })
  )
  store.dispatch({ type: APP_FINISHED_LOADING })

  const wrapper = mount(
    <ThemeProvider theme={light}>
      <App store={store}>
        <Settings />
      </App>
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
