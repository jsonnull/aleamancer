// @flow
import React from 'react'
import styled from 'styled-components'
import Label from '../Label'
import Button from '../Button'
import type { ThemeName } from 'common/types'

const DarkButton = Button.extend`
  margin-left: 5px;
`

const ThemeButtons = styled.div`
  display: flex;
`

type Props = {
  currentTheme: ThemeName,
  changeTheme: ThemeName => any
}

const ThemeSwitcher = (props: Props) => {
  const isLightTheme = props.currentTheme == 'light'
  const isDarkTheme = props.currentTheme == 'dark'

  const useGreen = { green: true }
  const useOutline = { outline: true }

  const lightButton = isLightTheme ? useGreen : useOutline
  const darkButton = isDarkTheme ? useGreen : useOutline

  return (
    <div>
      <Label>Theme</Label>
      <ThemeButtons>
        <Button {...lightButton} onClick={() => props.changeTheme('light')}>
          Light
        </Button>
        <DarkButton {...darkButton} onClick={() => props.changeTheme('dark')}>
          Dark
        </DarkButton>
      </ThemeButtons>
    </div>
  )
}

export default ThemeSwitcher
