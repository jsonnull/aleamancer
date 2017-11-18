// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import Create from '../Create.js'

describe('Sessions Create component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Create createSession={() => {}} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
