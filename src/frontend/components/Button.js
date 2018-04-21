// @flow
import styled, { css } from 'styled-components'
import * as themes from 'frontend/styles/themes'
import { colors, fontSize, timings } from 'frontend/styles/common'

function shade(hex: string, lum: number = 0) {
  hex = hex.replace(/[^0-9a-f]/gi, '')

  console.assert(hex.length === 6)

  let rgb = '#'

  for (let i = 0; i < 3; i++) {
    let c = parseInt(hex.substr(i * 2, 2), 16)
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16)
    rgb += ('00' + c).substr(c.length)
  }

  return rgb
}

const boxShadow = color => `inset 0 -20px 10px -10px ${shade(color, -0.06)}`
const hoverBackground = color => shade(color, -0.09)
const hoverBoxShadow = color =>
  `inset 0 -20px 10px -10px ${shade(color, -0.15)};`

const redMixin = css`
  background: ${colors.red};
  box-shadow: ${boxShadow(colors.red)};
  &:hover {
    background: ${hoverBackground(colors.red)};
    box-shadow: ${hoverBoxShadow(colors.red)};
  }
`

const greenMixin = css`
  background: ${colors.green};
  box-shadow: ${boxShadow(colors.green)};
  &:hover {
    background: ${hoverBackground(colors.green)};
    box-shadow: ${hoverBoxShadow(colors.green)};
  }
`

const outlineMixin = css`
  background: transparent;
  box-shadow: none;
  border: 1px solid ${props => props.theme.color};
  color: ${props => props.theme.color};
  &:hover {
    box-shadow: ${props => hoverBoxShadow(props.theme.background)};
    background: transparent;
  }
`

export const Button = styled.button`
  display: inline-block;
  font-size: ${fontSize.small};
  line-height: 3rem;
  height: 3rem;
  padding: 0 1rem;
  outline: 0;
  color: ${themes.dark.color};
  background: ${colors.blue};
  box-shadow: ${boxShadow(colors.blue)};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background, box-shadow;
  transition-duration: 0.1s;
  transition-timing-function: ${timings.easeOutQuad};
  flex: 1;

  &:hover {
    background: ${hoverBackground(colors.blue)};
    box-shadow: ${hoverBoxShadow(colors.blue)};
    transition: background, box-shadow;
    transition-duration: 0.1s;
    transition-timing-function: ${timings.easeOutQuad};
  }

  ${props => (props.red ? redMixin : null)};
  ${props => (props.green ? greenMixin : null)};
  ${props => (props.outline ? outlineMixin : null)};
`

export default Button
