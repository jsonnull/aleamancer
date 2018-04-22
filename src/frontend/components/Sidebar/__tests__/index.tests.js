// @flow
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import Sidebar from '../index.js'

describe('Sidebar component', () => {
  const renderer = new ShallowRenderer()
  it('renders correctly', () => {
    const currentSession = { game: { name: 'name' } }
    renderer.render(
      <Sidebar
        currentSession={currentSession}
        tab="Session"
        changeTab={() => {}}
      />
    )
    const tree = renderer.getRenderOutput()
    expect(tree).toMatchSnapshot()
  })
})
