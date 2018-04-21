// @flow

const Message = `
  type Message {
    id: ID!
    from: String!
    result: String
    text: String!
    timestamp: String!
  }

  extend type Query {
    message: Message
  }

  input MessageInput {
    from: String!
    result: String
    text: String!
  }

  extend type Mutation {
    sendMessage(message: MessageInput!): Message
  }
`

export default Message
