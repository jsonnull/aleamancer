// @flow
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import { Login } from '../Login'

describe('Login component', () => {
  const renderer = new ShallowRenderer()

  it('renders correctly', () => {
    renderer.render(
      <Login
        email="test@example.com"
        password="test"
        onEmailChange={() => {}}
        onPasswordChange={() => {}}
        onLogin={() => {}}
      />
    )
    const tree = renderer.getRenderOutput()
    expect(tree).toMatchSnapshot()
  })
})
