// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import Button from '../Button.js'

describe('Header Button component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Button />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
