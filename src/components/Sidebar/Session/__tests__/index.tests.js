// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import Sessions from '../index.js'

describe('Sidebar Sessions component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Sessions name="name" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
