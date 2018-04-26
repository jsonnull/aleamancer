// @flow
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import produce from 'immer'
import { subscribeToNewMessages } from '../../subscriptions'
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
  }),
  props: props => ({
    gameWithMessages: props.data,
    subscribeToNewMessages: () => {
      // No existing query results, do not subscribe
      if (!props.data.game) {
        return
      }
      return props.data.subscribeToMore({
        document: subscribeToNewMessages,
        variables: {
          game: props.ownProps.match.params.id
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (subscriptionData.errors) {
            subscriptionData.errors.forEach(error => console.warn(error))
            return
          }

          const newMessage = subscriptionData.data.messageAdded

          const existingMessage = prev.game.messageConnection.edges.find(
            ({ node }) => {
              const isSameById = node.id == newMessage.id
              const isOptimisticResponse =
                typeof node.id === 'number' && node.text == newMessage.text
              return isSameById || isOptimisticResponse
            }
          )

          // Optistic update with the same content but no id, so we replace it
          if (existingMessage && typeof existingMessage.node.id === 'number') {
            return produce(prev, draftState => {
              draftState.prev.messageConnection.edges.forEach(edge => {
                if (edge.node.id === existingMessage.node.id) {
                  edge.node = newMessage
                }
              })
            })
          } else if (existingMessage) {
            return prev
          }

          // Add the new message to the data
          return produce(prev, draftState => {
            draftState.game.messageConnection.edges.push({
              __typename: 'GameMessageEdge',
              cursor: 'test',
              node: newMessage
            })
          })
        }
      })
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

export const getGameMessagesByMatch = graphql(
  getGameMessagesQuery,
  getGameByMatchOptions
)
