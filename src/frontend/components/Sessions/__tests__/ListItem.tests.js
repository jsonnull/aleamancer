// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import ListItem from '../ListItem.js'

describe('Sessions ListItem component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<ListItem name="name" setSession={() => {}} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
