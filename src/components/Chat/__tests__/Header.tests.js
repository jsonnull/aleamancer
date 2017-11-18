// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import Header from '../Header.js'

describe('Chat header component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Header isPinned={false} toggleChatPin={() => {}} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
