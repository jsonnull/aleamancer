// @flow

const User = `
  type User {
    id: ID!
    preferences: Preferences
    games: [Game]
  }

  extend type Query {
    user(id: ID!): User
    currentUser: User
  }
`

export default User
