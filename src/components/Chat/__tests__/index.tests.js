// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import Chat from '../index.js'

describe('Chat component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Chat
          messages={[]}
          isPinned={false}
          toggleChatPin={() => {}}
          sendMessage={() => {}}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
