// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import Logo from '../Logo.js'

describe('Header Logo component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Logo />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
