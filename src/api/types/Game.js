// @flow

const Game = `
  type Game {
    id: ID!
    name: String!
    owner: User!
  }

  extend type Query {
    game(id: ID!): Game
  }
`

export default Game
