// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import Settings from '../Settings'

describe('Header Settings component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Settings showSettings={() => {}} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
