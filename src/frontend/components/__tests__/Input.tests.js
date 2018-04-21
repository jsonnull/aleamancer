// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import Input from 'frontend/components/Input'

describe('Input component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Input />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
