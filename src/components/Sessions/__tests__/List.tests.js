// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import List from '../List.js'

describe('Sessions List component', () => {
  it('renders correctly with no sessions', () => {
    const tree = renderer
      .create(<List sessions={[]} setSession={() => {}} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  const sessions = [
    {
      sessionId: 'id',
      meta: {
        name: 'testName'
      }
    }
  ]
  it('renders correctly with sessions', () => {
    const tree = renderer
      .create(<List sessions={sessions} setSession={() => {}} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
