// @flow
import React from 'react'
import styled from 'styled-components'
import { fontSize } from 'frontend/styles/common'

const Container = styled.div`
  background-color: ${props => props.theme.backgroundSecondary};
  line-height: 2.5rem;
  color: ${props => props.theme.colorMedium};
  font-size: ${fontSize.small};
  padding: 0 1rem;
`

const Info = () => (
  <Container>
    {'/roll 1d6, '}
    <strong>*bold*</strong> <em>_italic_</em>
  </Container>
)

export default Info
