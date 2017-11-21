// @flow
import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import { ConnectedRouter, push } from 'react-router-redux'
import { hydrateUserData } from '../../../src/actions'
import setupStore, { history } from '../../setupStore'
import Sessions from '../../../src/containers/Sessions'

describe('Sessions container', () => {
  it('should show placeholder text if user has no sessions', () => {
    const store = setupStore()
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Sessions />
        </ConnectedRouter>
      </Provider>
    )
    expect(wrapper.text()).toContain(
      "Yikes, looks like you're not a member of any games."
    )
  })

  const data = {
    userSessions: {
      userSessionId1: {
        sessionId: 'id1',
        meta: {
          name: 'testName1'
        }
      },
      userSessionId2: {
        sessionId: 'id2',
        meta: {
          name: 'testName2'
        }
      }
    }
  }
  const storeWithSessions = setupStore()
  storeWithSessions.dispatch(hydrateUserData(data))
  const wrapper = mount(
    <Provider store={storeWithSessions}>
      <ConnectedRouter history={history}>
        <Sessions />
      </ConnectedRouter>
    </Provider>
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
      '/g/id1/testname1'
    )
  })
})
