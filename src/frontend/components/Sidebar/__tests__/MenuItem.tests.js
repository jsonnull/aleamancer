// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import MenuItem from '../MenuItem.js'

describe('Sidebar MenuItem component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MenuItem name="name" icon="icon" selected action={() => {}} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
