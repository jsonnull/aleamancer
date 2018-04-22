// @flow
import React from 'react'
import { mount } from 'enzyme'
import { push } from 'react-router-redux'
import App, { setupStore } from '../../appContainer'
import Sidebar from 'frontend/containers/Sidebar'

describe('Sidebar container', () => {
  const store = setupStore()
  const sessions = [
    {
      id: 'id1',
      meta: {
        name: 'Test Session'
      }
    }
  ]
  store.dispatch(push('/g/test-session/id1'))

  const wrapper = mount(
    <App store={store}>
      <Sidebar />
    </App>
  )

  it('show the name of the session', () => {
    expect(wrapper.text()).toContain('Test Session')
  })

  it('should allow the user to change tabs', () => {
    expect(store.getState().sidebar.tab).toEqual('Session')
    wrapper
      .find('MenuItem[name="Character"]')
      .find('div[selected=false]')
      .simulate('click')
    expect(store.getState().sidebar.tab).toEqual('Character')
  })
})
