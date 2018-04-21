// @flow

const Preferences = `
  type Preferences {
    id: ID!
    chatPinned: Boolean
    theme: String
  }

  extend type Query {
    preferences: Preferences
  }

  extend type Mutation {
    setChatPinned(isPinned: Boolean!): Boolean
  }
`

export default Preferences
