// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import Sessions from '../index.js'

describe('Sessions component', () => {
  const data = {
    loading: false,
    error: undefined,
    currentUser: {
      games: [
        {
          id: 'id',
          name: 'testName'
        }
      ]
    }
  }

  it('renders correctly', () => {
    const tree = renderer
      .create(<Sessions data={data} switchToSession={() => {}} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
