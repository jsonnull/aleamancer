// @flow
import React from 'react'
import styled from 'styled-components'
import type { SessionInfo } from 'common/types'
import Item from './ListItem'

const EmptyList = styled.div`
  margin: 2rem 0;
`

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -1rem;
  margin-right: -1rem;
`

const Loading = () => <div>Loading...</div>

type Props = {
  data: { loading: boolean, error?: string, variables: Object },
  setSession: Function
}

const FullList = (props: Props) => {
  const { loading, error, currentUser } = props.data

  if (loading) {
    return <Loading />
  }

  if (error) {
    throw error
  }

  const sessions = currentUser.games

  if (sessions.length === 0) {
    return (
      <EmptyList>
        {
          "Yikes, looks like you're not a member of any games. Want to start one?"
        }
      </EmptyList>
    )
  }

  return (
    <List>
      {sessions.map(session => (
        <Item
          key={session.id}
          name={session.name}
          setSession={() => props.setSession(session.id)}
        />
      ))}
    </List>
  )
}

export default FullList
