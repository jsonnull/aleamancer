// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import Home from '../Home.js'

describe('Header Home component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Home goHome={() => {}} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
