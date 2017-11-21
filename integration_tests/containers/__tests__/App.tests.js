// @flow
import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { ConnectedRouter, push } from 'react-router-redux'
import { sendMessage, receiveMessage } from '../../../src/actions'
import {
  APP_FINISHED_LOADING,
  SHOW_SETTINGS,
  USER_LOGGED_IN
} from '../../../src/actions/types'
import setupStore, { history, dispatchSpy } from '../../setupStore'
import App from '../../../src/containers/App'

describe('App container', () => {
  let store, wrapper

  beforeEach(() => {
    store = setupStore()

    wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    )
  })

  it('should show loading screen', () => {
    expect(wrapper.find('LoadingModal')).toHaveLength(1)
  })

  it('should dismiss loading screen', () => {
    store.dispatch({ type: APP_FINISHED_LOADING })
    wrapper.update()
    expect(wrapper.find('LoadingModal')).toHaveLength(0)
  })

  it('should show login', () => {
    store.dispatch({ type: APP_FINISHED_LOADING })
    wrapper.update()
    expect(wrapper.find('input[name="username"]')).toHaveLength(1)
  })

  it('should allow user to login', () => {
    store.dispatch({ type: APP_FINISHED_LOADING })
    store.dispatch({ type: USER_LOGGED_IN })
    wrapper.update()
    expect(wrapper.find('Sessions')).toHaveLength(1)
  })

  it('should allow user to open settings', () => {
    store.dispatch({ type: APP_FINISHED_LOADING })
    store.dispatch({ type: USER_LOGGED_IN })
    store.dispatch({ type: SHOW_SETTINGS })
    wrapper.update()
    expect(wrapper.find('Settings').length).toBeGreaterThan(0)
  })
})
