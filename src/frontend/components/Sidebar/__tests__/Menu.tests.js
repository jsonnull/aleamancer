// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import Menu from '../Menu.js'

describe('Sidebar Menu component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Menu tab="Session" changeTab={() => {}} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
