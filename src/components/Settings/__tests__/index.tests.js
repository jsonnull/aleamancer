// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import Settings from '../index.js'
import { light } from '../../../styles/themes'

describe('Settings component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Settings
          showSettings={true}
          displayName="test"
          changeDisplayName={() => {}}
          theme={light}
          changeTheme={() => {}}
          logout={() => {}}
          dismissSettings={() => {}}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
