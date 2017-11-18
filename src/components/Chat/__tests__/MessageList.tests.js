// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import MessageList from '../MessageList.js'

describe('Chat MessageList component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<MessageList messages={[]} isPinned={false} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
