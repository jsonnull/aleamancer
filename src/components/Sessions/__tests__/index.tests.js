// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import Sessions from '../index.js'

describe('Sessions component', () => {
  const sessions = [
    {
      sessionId: 'id',
      meta: {
        name: 'testName'
      }
    }
  ]
  it('renders correctly', () => {
    const tree = renderer
      .create(<Sessions sessions={sessions} switchToSession={() => {}} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
