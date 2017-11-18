// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import Header from '../index.js'

describe('Header component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Header username="test" goHome={() => {}} showSettings={() => {}} />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
