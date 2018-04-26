// @flow
import gql from 'graphql-tag'
import messageDataFragment from '../fragments/message/messageData'

export const subscribeToNewMessages = gql`
  subscription subscribeToNewMessages($game: ID!) {
    messageAdded(game: $game) {
      ...messageData
    }
  }
  ${messageDataFragment}
`
