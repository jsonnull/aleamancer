// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import Label from '../Label.js'

describe('Label component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Label />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
