// @flow
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import App from '../App'
import { light } from '../../styles/themes'

describe('App component', () => {
  const renderer = new ShallowRenderer()

  it('renders correctly when loading', () => {
    renderer.render(
      <App
        appIsLoading
        userIsLoggedIn={false}
        showSettings={false}
        location={{}}
        theme={light}
      />
    )
    const tree = renderer.getRenderOutput()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly when user is logged in', () => {
    renderer.render(
      <App
        appIsLoading={false}
        userIsLoggedIn
        showSettings={false}
        location={{}}
        theme={light}
      />
    )
    const tree = renderer.getRenderOutput()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly when settings should be showing', () => {
    renderer.render(
      <App
        appIsLoading={false}
        userIsLoggedIn
        showSettings
        location={{}}
        theme={light}
      />
    )
    const tree = renderer.getRenderOutput()
    expect(tree).toMatchSnapshot()
  })
})
