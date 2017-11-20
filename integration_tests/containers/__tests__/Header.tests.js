// @flow
import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { ConnectedRouter, push } from 'react-router-redux'
import setupStore, { history, dispatchSpy } from '../../setupStore'
import { SHOW_SETTINGS } from '../../../src/actions/types'
import Header from '../../../src/containers/Header'

describe('Header container', () => {
  const store = setupStore()
  const wrapper = mount(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Header />
      </ConnectedRouter>
    </Provider>
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
    wrapper
      .find('Home')
      .find('div')
      .simulate('click')
    expect(store.getState().router.location.pathname).toEqual('/')
  })
})
