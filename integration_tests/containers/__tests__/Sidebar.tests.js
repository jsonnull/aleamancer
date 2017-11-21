// @flow
import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { ConnectedRouter, push } from 'react-router-redux'
import { hydrateSession } from '../../../src/actions'
import setupStore, { history } from '../../setupStore'
import Sidebar from '../../../src/containers/Sidebar'

describe('Sidebar container', () => {
  const store = setupStore()
  store.dispatch(
    hydrateSession({
      name: 'Test Session'
    })
  )
  const wrapper = mount(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Sidebar />
      </ConnectedRouter>
    </Provider>
  )

  it('show the name of the session', () => {
    expect(wrapper.text()).toContain('Test Session')
  })

  it('should allow the user to change tabs', () => {
    expect(store.getState().sidebar.tab).toEqual('Session')
    wrapper.find('MenuItem[name="Character"]').simulate('click')
    expect(store.getState().sidebar.tab).toEqual('Character')
  })
})
