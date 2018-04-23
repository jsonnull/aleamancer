// @flow
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import gameMessagesFragment from '../../fragments/game/gameMessages'
import type { GameMessagesType } from '../../fragments/game/gameMessages'

export type GetGameMessagesType = {
  ...$Exact<GameMessagesType>
}

const getGameByMatchOptions = {
  options: ({ match: { params: { id } } }) => ({
    variables: {
      id
    }
  })
}

export const getGameMessagesQuery = gql`
  query getGameMessages($id: ID!) {
    game(id: $id) {
      ...gameMessages
    }
  }
  ${gameMessagesFragment}
`

export const getGameMessagesByMatch = graphql(getGameMessagesQuery, {
  name: 'gameWithMessages',
  ...getGameByMatchOptions
})
