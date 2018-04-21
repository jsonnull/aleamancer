// @flow
import React from 'react'
import { mount } from 'enzyme'
import App, { setupStore, dispatchSpy } from '../../appContainer'
import { userLoggedIn, hydrateUserProfile } from 'frontend/actions'
import { SHOW_SETTINGS } from 'frontend/actions/types'
import Header from 'frontend/containers/Header'

describe('Header container', () => {
  const store = setupStore()
  // Mimic user login and basic details
  store.dispatch(userLoggedIn('testUserId', 'test@example.com'))
  store.dispatch(
    hydrateUserProfile({
      displayName: 'anonymous',
      photoURL: null
    })
  )

  const wrapper = mount(
    <App store={store}>
      <Header />
    </App>
  )

  it('should show the users display name', () => {
    expect(wrapper.text()).toContain('anonymous')
  })

  it('should allow the user to open settings', () => {
    wrapper
      .find('Settings')
      .find('div')
      .simulate('click')
    expect(dispatchSpy.calledWith({ type: SHOW_SETTINGS })).toBe(true)
  })

  it('should allow the user to navigate home', () => {
    wrapper.find('Home').simulate('click')
    expect(store.getState().router.location.pathname).toEqual('/')
  })
})
