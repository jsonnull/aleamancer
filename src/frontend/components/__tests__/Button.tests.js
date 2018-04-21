// @flow
import React from 'react'
import { ThemeProvider } from 'styled-components'
import renderer from 'react-test-renderer'
import Button from 'frontend/components/Button.js'
import { light } from 'frontend/styles/themes'

describe('Button component', () => {
  it('renders correctly with no options', () => {
    const tree = renderer.create(<Button />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly with red option set', () => {
    const tree = renderer.create(<Button red />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly with green option set', () => {
    const tree = renderer.create(<Button green />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly with outline option set', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={light}>
          <Button outline />
        </ThemeProvider>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
