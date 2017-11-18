// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import Logout from '../Logout.js'

describe('Settings Logout component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Logout logout={() => {}} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
