// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import Login from '../Login'

describe('Login component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Login
          email="test@example.com"
          password="test"
          onEmailChange={() => {}}
          onPasswordChange={() => {}}
          onLogin={() => {}}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
