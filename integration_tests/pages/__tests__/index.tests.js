// @flow
import React from 'react'
import { mount } from 'enzyme'
import App, { setupStore } from '../../appContainer'
import { USER_LOGGED_IN, SHOW_SETTINGS } from 'frontend/actions/types'
import Pages from 'frontend/pages'

describe('App container', () => {
  let store, wrapper

  beforeEach(() => {
    store = setupStore()

    wrapper = mount(
      <App store={store}>
        <Pages />
      </App>
    )
  })

  it('should allow user to open settings', () => {
    store.dispatch({ type: USER_LOGGED_IN })
    store.dispatch({ type: SHOW_SETTINGS })
    wrapper.update()
    expect(wrapper.find('Settings').length).toBeGreaterThan(0)
  })
})
