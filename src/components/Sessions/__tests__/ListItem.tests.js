// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import ListItem from '../ListItem.js'

describe('Sessions ListItem component', () => {
  const session = {
    sessionId: 'id',
    meta: {
      name: 'testName'
    }
  }
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <ListItem isCurrent={true} session={session} setSession={() => {}} />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
