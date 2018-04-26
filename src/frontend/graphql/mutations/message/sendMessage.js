// @flow
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import messageDataFragment from '../../fragments/message/messageData'

const sendMessageMutation = gql`
  mutation SendMessage($game: ID!, $message: MessageInput!) {
    sendMessage(game: $game, message: $message) {
      ...messageData
    }
  }
  ${messageDataFragment}
`

const sendMessageOptions = {
  props: ({ ownProps, mutate }) => ({
    sendMessage: (text: string) => {
      return mutate({
        variables: {
          game: ownProps.match.params.id,
          message: {
            text
          }
        }
      })
    }
  })
}

export default graphql(sendMessageMutation, sendMessageOptions)
