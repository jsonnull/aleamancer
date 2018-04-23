// @flow

const User = `
  type Preferences {
    id: ID!
    chatPinned: Boolean
    theme: String
  }

  type User {
    id: ID!
    preferences: Preferences
    games: [Game]
  }

  extend type Query {
    user(id: ID!): User
    currentUser: User
  }

  extend type Mutation {
    setChatPinned(isPinned: Boolean!): Preferences
  }
`

export default User
