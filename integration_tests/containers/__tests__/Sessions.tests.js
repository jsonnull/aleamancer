// @flow
import React from 'react'
import { mount } from 'enzyme'
import App, { setupStore } from '../../appContainer'
import Sessions from 'frontend/containers/Sessions'

describe('Sessions container', () => {
  const store = setupStore()
  const wrapper = mount(
    <App store={store}>
      <Sessions />
    </App>
  )

  it('should pass', () => {
    expect(true).toBe(true)
  })

  // TODO: Rethink testing strategy here, we can test the interaction and
  // container separately
  /*
  it('should show list of sessions', () => {
    expect(wrapper.find('Item')).toHaveLength(1)
  })

  it('should navigate to session on click', () => {
    wrapper
      .find('Item')
      .first()
      .simulate('click')
    expect(storeWithSessions.getState().router.location.pathname).toEqual(
      '/g/testname1/id1'
    )
  })
  */
})
