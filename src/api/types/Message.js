// @flow

const Message = `
  type Message {
    id: ID!
    from: String!
    result: String
    text: String!
    timestamp: Date!
  }

  extend type Query {
    message: Message
  }

  input MessageInput {
    text: String!
  }

  extend type Mutation {
    sendMessage(game: ID!, message: MessageInput!): Message
  }

  extend type Subscription {
    messageAdded(game: ID!): Message
  }
`

export default Message
