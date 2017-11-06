// @flow
import React from 'react'
import styled from 'styled-components'
import { fontSize } from 'styles/common'

const Button = styled.div`
  height: 3.25rem;
  width: ${props => (props.square ? '3.25rem' : 'auto')};
  line-height: 3.25rem;
  padding: 0 1rem;
  text-align: center;
  font-size: ${fontSize.normal};
  background: ${props => props.theme.backgroundInverted};
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: ${props => props.theme.backgroundInvertedSecondary};
  }
`

export default Button
