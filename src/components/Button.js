// @flow
import styled, { css } from 'styled-components'
import * as themes from 'styles/themes'
import { fontSize, colors } from 'styles/common'

const redMixin = css`
  background-color: ${colors.red};
  color: white;
  &:hover {
    background-color: ${colors.red};
    color: white;
  }
`

const greenMixin = css`
  background-color: ${colors.green};
  color: white;
  &:hover {
    background-color: ${colors.green};
    color: white;
  }
`

const outlineMixin = css`
  background-color: transparent;
  border: 1px solid ${props => props.theme.color};
  color: ${props => props.theme.color};
  &:hover {
    background-color: transparent;
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
  background-color: ${colors.blue};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background, text-shadow;
  transition-duration: 0.1s;
  transition-timing-function: ease-out;
  flex: 1;

  &:hover {
    text-shadow: 0 0 3px white;
    background-color: ${colors.lightBlue};
    transition: background, text-shadow;
    transition-duration: 0.1s;
    transition-timing-function: ease-out;
  }

  ${props => (props.red ? redMixin : null)} ${props =>
      props.green ? greenMixin : null} ${props =>
      props.outline ? outlineMixin : null};
`

export default Button
