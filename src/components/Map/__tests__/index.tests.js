// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import Map from '../index.js'

describe('Map component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Map />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
