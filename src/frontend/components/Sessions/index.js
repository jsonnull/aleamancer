// @flow
import React from 'react'
import { Container, Body, Heading } from './styles'
import Create from './Create'
import List from './List'
import type { GetCurrentUserGamesType } from 'frontend/graphql/queries/currentUser/getCurrentUserGames'

type Props = {
  currentUserWithGames: {
    loading: boolean,
    error: ?string,
    currentUser: { games?: Array<GetCurrentUserGamesType> }
  },
  switchToSession: Function
}

const Sessions = (props: Props) => {
  const {
    currentUserWithGames: { loading, currentUser },
    switchToSession
  } = props

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
