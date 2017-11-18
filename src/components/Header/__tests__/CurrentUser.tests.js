// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import CurrentUser from '../CurrentUser.js'

describe('Header CurrentUser component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<CurrentUser username="test" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
