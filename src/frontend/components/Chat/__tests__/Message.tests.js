// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import Message from '../Message.js'

describe('Chat Message component', () => {
  it('renders correctly', () => {
    const message = {
      id: 'key',
      from: 'testUser',
      text: 'text',
      result: null,
      timestamp: new Date(0)
    }
    const tree = renderer
      .create(<Message message={message} isPinned={false} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
