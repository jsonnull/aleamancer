// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import ThemeSwitcher from '../ThemeSwitcher.js'

describe('Settings ThemeSwitcher component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<ThemeSwitcher currentTheme="light" changeTheme={() => {}} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
