// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import ThemeSwitcher from '../ThemeSwitcher.js'
import { light } from 'frontend/styles/themes'

describe('Settings ThemeSwitcher component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={light}>
          <ThemeSwitcher currentTheme="light" changeTheme={() => {}} />
        </ThemeProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
