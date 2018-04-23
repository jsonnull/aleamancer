// @flow
import gql from 'graphql-tag'
import messageDataFragment from '../message/messageData'
import type { MessageDataType } from '../message/messageData'

export type GameMessagesType = {
  messageConnection: {
    edges: Array<{
      node: {
        ...$Exact<MessageDataType>
      }
    }>
  }
}

export default gql`
  fragment gameMessages on Game {
    messageConnection {
      edges {
        node {
          ...messageData
        }
      }
    }
  }

  ${messageDataFragment}
`
