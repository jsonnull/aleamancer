// @flow

const Game = `
  type GameMessageConnection {
    edges: [GameMessageEdge]
  }

  type GameMessageEdge {
    cursor: String!
    node: Message!
  }

  type Game {
    id: ID!
    name: String!
    owner: User!
    messageConnection(first: Int): GameMessageConnection!
  }

  extend type Query {
    game(id: ID!): Game
  }
`

export default Game
