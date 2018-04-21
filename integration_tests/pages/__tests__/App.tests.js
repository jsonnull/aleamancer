// @flow
import React from 'react'
import { mount } from 'enzyme'
import AppContainer, { setupStore } from '../../appContainer'
import {
  APP_FINISHED_LOADING,
  SHOW_SETTINGS,
  USER_LOGGED_IN
} from 'frontend/actions/types'
import App from 'frontend/pages/App'

describe('App container', () => {
  let store, wrapper

  beforeEach(() => {
    store = setupStore()
    store.dispatch({ type: USER_LOGGED_IN })

    wrapper = mount(
      <AppContainer store={store}>
        <App />
      </AppContainer>
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

  // TODO: Ensure this test coverage is present on new Login page tests
  /*
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
  */
})
