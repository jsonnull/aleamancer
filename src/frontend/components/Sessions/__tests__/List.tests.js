// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import List from '../List.js'

describe('Sessions List component', () => {
  const currentUserWithNoSessions = {
    games: []
  }
  it('renders correctly with no sessions', () => {
    const tree = renderer
      .create(
        <List
          loading={false}
          currentUser={currentUserWithNoSessions}
          setSession={() => {}}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  const currentUser = {
    games: [
      {
        id: 'id',
        name: 'testName'
      }
    ]
  }
  it('renders correctly with sessions', () => {
    const tree = renderer
      .create(
        <List loading={false} currentUser={currentUser} setSession={() => {}} />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
