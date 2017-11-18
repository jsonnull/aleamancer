// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import Info from '../Info.js'

describe('Chat Info component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Info />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
