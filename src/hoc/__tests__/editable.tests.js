// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import editable from '../editable.js'

describe('editable component', () => {
  it('renders correctly', () => {
    const Component = editable(() => <div />)
    const tree = renderer
      .create(
        <Component input={() => <input />} value="test" onChange={() => {}} />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
