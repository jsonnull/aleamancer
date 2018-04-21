// @flow
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import Sidebar from '../index.js'

describe('Sidebar component', () => {
  const renderer = new ShallowRenderer()
  it('renders correctly', () => {
    renderer.render(
      <Sidebar name="name" open={true} tab="Session" changeTab={() => {}} />
    )
    const tree = renderer.getRenderOutput()
    expect(tree).toMatchSnapshot()
  })
})
