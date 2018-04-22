// @flow
import React from 'react'
import { mount } from 'enzyme'
import App, { setupStore } from '../../appContainer'
import Sessions from 'frontend/containers/Sessions'

describe('Sessions container', () => {
  it('should show placeholder text if user has no sessions', () => {
    const store = setupStore()
    const wrapper = mount(
      <App store={store}>
        <Sessions />
      </App>
    )
    expect(wrapper.text()).toContain(
      "Yikes, looks like you're not a member of any games."
    )
  })

  const sessions = [
    {
      id: 'id1',
      meta: {
        name: 'testName1'
      }
    },
    {
      id: 'id2',
      meta: {
        name: 'testName2'
      }
    }
  ]
  const storeWithSessions = setupStore()
  // storeWithSessions.dispatch(hydrateSessionsList(sessions))
  const wrapper = mount(
    <App store={storeWithSessions}>
      <Sessions />
    </App>
  )
  it('should show list of sessions', () => {
    expect(wrapper.find('Item')).toHaveLength(2)
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
})
