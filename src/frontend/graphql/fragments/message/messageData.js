// @flow
import gql from 'graphql-tag'

export type MessageDataType = {
  id: string,
  from: string,
  text: string,
  result: any,
  timestamp: Date
}

export default gql`
  fragment messageData on Message {
    id
    from
    text
    result
    timestamp
  }
`
