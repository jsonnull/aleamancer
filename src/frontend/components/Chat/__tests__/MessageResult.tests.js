// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import MessageResult from '../MessageResult.js'

describe('Chat MessageResult component', () => {
  it('renders correctly', () => {
    const result = [
      {
        die: 6,
        result: 4,
        operation: '+'
      }
    ]
    const tree = renderer.create(<MessageResult result={result} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
