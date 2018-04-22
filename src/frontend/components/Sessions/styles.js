// @flow
import styled from 'styled-components'
import { fontSize, fonts } from 'frontend/styles/common'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: 1;
`

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: ${props => props.theme.background};
  padding: 0 2rem;
`

export const Heading = styled.h1`
  font-size: ${fontSize.large};
  line-height: 1;
  font-family: ${fonts.heading};
  padding: 1rem 0;
  color: ${props => props.theme.color};
  margin: 0;
`
