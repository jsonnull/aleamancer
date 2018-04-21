// @flow
import React from 'react'
import styled from 'styled-components'
import { fontSize, fonts } from 'frontend/styles/common'
import type { SessionInfo } from 'common/types'
import Create from './Create'
import List from './List'

type Props = {
  data: { loading: boolean, error?: string, variables: Object },
  switchToSession: Function
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: 1;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: ${props => props.theme.background};
  padding: 0 2rem;
`

const Heading = styled.h1`
  font-size: ${fontSize.large};
  line-height: 1;
  font-family: ${fonts.heading};
  padding: 1rem 0;
  color: ${props => props.theme.color};
  margin: 0;
`

const Sessions = (props: Props) => {
  const { data, switchToSession } = props

  return (
    <Container>
      <Body>
        <Heading>Your Games</Heading>
        <List data={data} setSession={switchToSession} />
        <Create createSession={() => {}} />
      </Body>
    </Container>
  )
}

export default Sessions
