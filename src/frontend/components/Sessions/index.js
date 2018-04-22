// @flow
import React from 'react'
import { Container, Body, Heading } from './styles'
import Create from './Create'
import List from './List'
import type { GetCurrentUserGamesType } from 'frontend/graphql/queries/getCurrentUserGames'

type Props = {
  data: {
    loading: boolean,
    error: ?string,
    currentUser: { games?: Array<GetCurrentUserGamesType> }
  },
  switchToSession: Function
}

const Sessions = (props: Props) => {
  const { data: { loading, error, currentUser }, switchToSession } = props

  return (
    <Container>
      <Body>
        <Heading>Your Games</Heading>
        <List
          loading={loading}
          currentUser={currentUser}
          setSession={switchToSession}
        />
        <Create createSession={() => {}} />
      </Body>
    </Container>
  )
}

export default Sessions
