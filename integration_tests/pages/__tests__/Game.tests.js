// @flow
import React from 'react'
import { mount } from 'enzyme'
import AppContainer, { setupStore } from '../../appContainer'
import { push } from 'react-router-redux'
import { Route } from 'react-router'
import Game from 'frontend/pages/Game'

describe('Game view', () => {
  let store, wrapper

  beforeEach(() => {
    store = setupStore()
    store.dispatch(push('/g/name/id'))

    wrapper = mount(
      <AppContainer store={store}>
        <Route exact path="/g/:name/:id" component={Game} />
      </AppContainer>
    )
  })

  it('should pass', () => {
    expect(true).toBe(true)
  })

  // TODO: Move this test coverage to RequireUser Route hoc
  /*
  it('should show loading screen', () => {
    expect(wrapper.find('LoadingModal')).toHaveLength(1)
  })

  it('should dismiss loading screen', () => {
    store.dispatch({ type: USER_LOGGED_IN })
    store.dispatch({ type: INITIAL_AUTH_FINISHED })
    wrapper.update()
    expect(wrapper.find('LoadingModal')).toHaveLength(0)
  })
  */

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
